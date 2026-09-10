const { ApiPromise, WsProvider } = require("@polkadot/api");

const ENDPOINT = "wss://acala-rpc-1.aca-api.network";

// AssetHub (Polkadot) USDT: paraId=1000, pallet=50 (assets), assetId=1984
// XCM multilocation: parents:1, X3(Parachain(1000), PalletInstance(50), GeneralIndex(1984))

// ========== 工具 ==========

function delay(ms = 2) {
  return new Promise((r) => setTimeout(r, ms));
}

function decodeCurrencyId(api, keyArg) {
  const keyBytes =
    keyArg instanceof Uint8Array ? keyArg : Buffer.from(keyArg.slice(2), "hex");
  for (const off of [48, 40, 32, 16, 8, 0]) {
    if (keyBytes.length <= off) continue;
    try {
      return api.createType("AcalaPrimitivesCurrencyCurrencyId", keyBytes.slice(off));
    } catch {}
  }
  throw new Error(
    `Cannot decode CurrencyId from ${Buffer.from(keyBytes.slice(0, 64)).toString("hex")}`,
  );
}

// ========== 主流程 ==========

(async () => {
  const ws = new WsProvider(ENDPOINT);
  const api = await ApiPromise.create({ provider: ws });

  console.log("=".repeat(70));
  console.log("  Acala 链上 AssetHub USDT 总量查询");
  console.log("=".repeat(70) + "\n");

  // ---- 1. 拿到所有 tokens.totalIssuance ----
  const entries = await api.query.tokens.totalIssuance.entries();
  console.log(`  tokens.totalIssuance 条目: ${entries.length} 个\n`);

  const foreignAssets = [];
  const allTokens = [];

  for (const [key, issuance] of entries) {
    const currencyId = decodeCurrencyId(api, key);
    const human = currencyId.toHuman();

    const faId = human.ForeignAsset ?? human.foreignAsset;
    const token = human.Token ?? human.token;

    if (faId != null) {
      foreignAssets.push({ currencyId, faId: Number(faId), issuance });
    }

    allTokens.push({
      currencyId,
      symbol: token || `FA(${faId})`,
      issuance,
    });
  }

  // ---- 2. 逐个 ForeignAsset 查 metadata 和 multilocation ----
  console.log("  正在查询各 ForeignAsset 的 metadata...\n");

  const list = [];

  for (const fa of foreignAssets) {
    const info = {
      faId: fa.faId,
      symbol: `FA(${fa.faId})`,
      name: `ForeignAsset(${fa.faId})`,
      decimals: 12,
      issuance: fa.issuance,
      multilocation: null,
    };

    // 尝试用 getStorage 查 metadata
    await delay();
    try {
      const metaKey = api.query.assetRegistry.assetMetadatas.key(fa.currencyId);
      const rawOpt = await api.rpc.state.getStorage(metaKey);
      if (rawOpt.isSome) {
        const decodeMeta = decodeAssetMetadata(rawOpt.unwrap());
        if (decodeMeta) {
          info.symbol = decodeMeta.symbol || info.symbol;
          info.name = decodeMeta.name || info.name;
          info.decimals = decodeMeta.decimals || 12;
        }
      }
    } catch {}

    // 尝试用 getStorage 查 multilocation
    await delay();
    try {
      const locKey = api.query.assetRegistry.currencyIdToMultilocation.key(fa.currencyId);
      const rawOpt = await api.rpc.state.getStorage(locKey);
      if (rawOpt.isSome) {
        const bytes = rawOpt.unwrap();
        info.multilocation = `0x${Buffer.from(bytes).toString("hex")}`;
        // 尝试用 XcmV3MultiLocation 解码
        try {
          const decoded = api.createType("XcmV3MultiLocation", bytes);
          info.multilocation = JSON.stringify(decoded.toHuman());
        } catch {
          // 保持 hex
        }
      }
    } catch {}

    list.push(info);
  }

  // ---- 3. 输出所有 ForeignAsset ----
  console.log("—— 所有 ForeignAsset ——\n");
  console.log(
    "  " +
      ["ID", "Symbol", "Name", "Dec", "Multilocation"]
        .map((h, i) => h.padEnd([6, 14, 28, 8, 60][i]))
        .join(""),
  );

  for (const fa of list) {
    console.log(
      "  " +
        [String(fa.faId), fa.symbol, fa.name, String(fa.decimals), fa.multilocation || "n/a"]
          .map((c, i) => c.slice(0, [6, 14, 28, 8, 60][i] - 1).padEnd([6, 14, 28, 8, 60][i]))
          .join(""),
    );
  }

  // ---- 4. 定位 AssetHub USDT ----
  console.log("\n—— 定位 AssetHub USDT ——\n");

  // 通过 multilocation
  let usdt = list.find(
    (fa) => fa.multilocation && fa.multilocation.includes("1000") && fa.multilocation.includes("1984"),
  );

  if (usdt) {
    console.log(`  匹配: FA(${usdt.faId}) via multilocation (paraId=1000, assetId=1984)`);
  }

  // 通过 symbol
  if (!usdt) {
    usdt = list.find((fa) => fa.symbol?.toUpperCase() === "USDT");
    if (usdt) console.log(`  匹配: FA(${usdt.faId}) via symbol="USDT"`);
  }

  // 兜底: 列出 multilocation hex 供人工判断
  if (!usdt && list.some((fa) => fa.multilocation && fa.multilocation.startsWith("0x"))) {
    console.log("  symbol 无 'USDT', multilocation 也无完整数据。\n");
    console.log("  以下是所有 ForeignAsset 的 multilocation hex (可手动对比):\n");
    for (const fa of list) {
      if (fa.multilocation?.startsWith("0x")) {
        // 手动解码 XCM multilocation 的简单结构
        const ml = parseXcmLocation(fa.multilocation);
        console.log(`  FA(${fa.faId}) → ${ml}`);
      }
    }
    console.log("\n  AssetHub USDT 应匹配: parents=1, Parachain=1000, PalletInstance=50, GeneralIndex=1984");
    console.log("  当前链上未找到 AssetHub USDT!\n");
    await api.disconnect();
    process.exit(0);
  }

  if (!usdt) {
    console.log("  当前链上未找到 AssetHub USDT（无 multilocation 数据且无 symbol='USDT'）\n");
    await api.disconnect();
    process.exit(0);
  }

  // ---- 5. 查询 totalIssuance ----
  const rawVal = BigInt(usdt.issuance.toString());
  const formatted = Number(rawVal) / Math.pow(10, usdt.decimals);

  console.log(`\n—— USDT 总量 ——`);
  console.log(`  CurrencyId:    ForeignAsset(${usdt.faId})`);
  console.log(`  Symbol:        ${usdt.symbol}`);
  console.log(`  Name:          ${usdt.name}`);
  console.log(`  Decimals:      ${usdt.decimals}`);
  console.log(`  Total (raw):   ${rawVal.toLocaleString()}`);
  console.log(
    `  Total:         ${formatted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: usdt.decimals })} USDT`,
  );

  // Oracle 价格
  try {
    const oracleRaw = await api.query.acalaOracle.values(usdt.currencyId);
    if (oracleRaw.isSome) {
      const price = Number(BigInt(oracleRaw.unwrap().value.toString())) / 1e18;
      console.log(`  Oracle Price:  $${price.toFixed(6)}`);
      console.log(
        `  Total Value:   $${(formatted * price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      );
    } else {
      console.log(`  Oracle Price:  无`);
    }
  } catch {
    console.log(`  Oracle Price:  查询失败`);
  }

  console.log();
  await api.disconnect();
  process.exit(0);
})();

// ========== 手动 SCALE 解码 ==========

/**
 * 解码 AssetMetadata: name(Vec<u8>) + symbol(Vec<u8>) + decimals(u32)
 */
function decodeAssetMetadata(bytes) {
  if (!bytes || bytes.length < 3) return null;
  const buf = Buffer.from(bytes);
  let pos = 0;

  const readCompact = () => {
    if (pos >= buf.length) return 0;
    const first = buf[pos];
    if (first < 64) {
      pos++;
      return first;
    }
    if (first < 192) {
      pos += 2;
      return ((first - 64) << 8) + buf[pos - 1];
    }
    if (first < 224) {
      pos += 3;
      return ((first - 192) << 16) + (buf[pos - 2] << 8) + buf[pos - 1];
    }
    pos += 5;
    return Number(
      (BigInt(first - 224) << 32n) |
        (BigInt(buf[pos - 4]) << 24n) |
        (BigInt(buf[pos - 3]) << 16n) |
        (BigInt(buf[pos - 2]) << 8n) |
        BigInt(buf[pos - 1]),
    );
  };

  try {
    const nameLen = readCompact();
    const name = buf.slice(pos, pos + nameLen).toString("utf8");
    pos += nameLen;

    const symLen = readCompact();
    const symbol = buf.slice(pos, pos + symLen).toString("utf8");
    pos += symLen;

    const decimals = buf.readUInt32LE(pos);

    return { name, symbol, decimals };
  } catch {
    return null;
  }
}

/**
 * 手动解析 XCM V3/V4 Multilocation hex
 * 基本格式: parents(u8) + interior(enum)
 * interior enum: Here=0, X1=1, X2=2, X3=3, ...
 *   X1: junction_enum + junction_data
 *   X2: junction1 + junction2
 *   junction: Parachain=0, AccountId32=1, AccountIndex64=2, AccountKey20=3, PalletInstance=4, GeneralIndex=5, ...
 */
function parseXcmLocation(hex) {
  if (!hex.startsWith("0x")) return "n/a";
  const buf = Buffer.from(hex.slice(2), "hex");
  if (buf.length < 2) return hex;

  const parents = buf[0];
  const interior = buf[1]; // enum variant

  let desc = `parents=${parents}, `;

  if (interior === 0) {
    desc += "Here";
  } else if (interior >= 1 && interior <= 3) {
    // X1/X2/X3
    const n = interior;
    const parts = [];
    let pos = 2;
    for (let i = 0; i < n && pos < buf.length; i++) {
      const junc = buf[pos++];
      const juncParts = ["Parachain", "AccountId32", "AccountIndex64", "AccountKey20", "PalletInstance", "GeneralIndex", "Plurality", "GlobalConsensus"];
      const juncName = juncParts[junc] || `Junc(${junc})`;

      if (junc === 0) {
        // Parachain(u32) — compact encoded
        const id = decodeCompactScalar(buf, pos);
        const { val, adv } = id;
        pos += adv;
        parts.push(`Parachain(${val})`);
      } else if (junc === 4) {
        // PalletInstance(u8)
        parts.push(`PalletInstance(${buf[pos++]})`);
      } else if (junc === 5) {
        // GeneralIndex(u128) — compact encoded
        const id = decodeCompactScalar(buf, pos);
        const { val, adv } = id;
        pos += adv;
        parts.push(`GeneralIndex(${val})`);
      } else {
        parts.push(`${juncName}(...)`);
        break;
      }
    }
    desc += `X${n}(${parts.join(", ")})`;
  } else {
    desc += `interior=${interior} (raw)`;
  }

  return desc;
}

function decodeCompactScalar(buf, pos) {
  if (pos >= buf.length) return { val: 0, adv: 0 };
  const first = buf[pos];
  if (first < 64) return { val: first, adv: 1 };
  if (first < 192) return { val: ((first - 64) << 8) + buf[pos + 1], adv: 2 };
  if (first < 224) return { val: ((first - 192) << 16) + (buf[pos + 1] << 8) + buf[pos + 2], adv: 3 };
  const val =
    ((first - 224) << 24) + (buf[pos + 1] << 16) + (buf[pos + 2] << 8) + buf[pos + 3];
  return { val, adv: 4 };
}
