const { getApi } = require("./api");

// 已知代币 fallback (当 assetRegistry 无数据时使用)
const KNOWN = {
  ACA:   { name: "Acala Token",              decimals: 12 },
  AUSD:  { name: "Acala USD (aUSD)",         decimals: 12 },
  LDOT:  { name: "Liquid DOT",               decimals: 10 },
  DOT:   { name: "Polkadot DOT",             decimals: 10 },
  LCDOT: { name: "Liquid Crowdloan DOT",     decimals: 10 },
  tDOT:  { name: "tDOT",                     decimals: 10 },
  USDCet:{ name: "USDC (Ethereum)",          decimals: 6 },
  USDT:  { name: "USDT",                     decimals: 6 },
  USDC:  { name: "USDC (Wormhole)",          decimals: 6 },
  WBTC:  { name: "Wrapped BTC",              decimals: 8 },
  WETH:  { name: "Wrapped ETH",              decimals: 18 },
  GLMR:  { name: "Glimmer",                  decimals: 18 },
  PARA:  { name: "Parallel",                 decimals: 12 },
  INTR:  { name: "Interlay",                 decimals: 10 },
  IBTC:  { name: "Interlay BTC",             decimals: 8 },
  ASEED: { name: "Acala SEED",               decimals: 12 },
  BNC:   { name: "Bifrost",                  decimals: 12 },
  vDOT:  { name: "vDOT",                     decimals: 10 },
  TAP:   { name: "Tapio",                    decimals: 12 },
  LP_ACA_AUSD:   { name: "LP ACA-aUSD",      decimals: 12 },
  LP_LDOT_AUSD:  { name: "LP LDOT-aUSD",     decimals: 12 },
};

// ========== 工具函数 ==========

function toBigInt(n) {
  if (typeof n === "bigint") return n;
  if (typeof n === "number") return BigInt(Math.floor(n));
  if (n && typeof n.toBigInt === "function") return n.toBigInt();
  return BigInt(String(n));
}

function formatSupply(n, decimals = 12) {
  const big = toBigInt(n);
  if (decimals === 0) return Number(big).toLocaleString();
  const div = 10n ** BigInt(decimals);
  const intPart = big / div;
  let frac = (big % div).toString().padStart(decimals, "0").replace(/0+$/, "");
  return frac ? `${intPart.toLocaleString()}.${frac}` : intPart.toLocaleString();
}

function fmtUSD(n) {
  if (n == null || isNaN(n)) return "n/a";
  const abs = Math.abs(n);
  if (abs >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (abs >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  if (abs >= 1e3)  return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(6)}`;
}

/**
 * 从 StorageKey 中解码 CurrencyId
 *
 * polkadot.js entries() 返回的 StorageKey 可能包含不同长度的前缀,
 * 这里按前缀长度从大到小依次尝试, 取第一个能正确解码的。
 */
function decodeCurrencyId(api, keyArg) {
  const keyBytes =
    keyArg instanceof Uint8Array ? keyArg : Buffer.from(keyArg.slice(2), "hex");

  const offsets = [48, 40, 32, 16, 8, 0];

  for (const offset of offsets) {
    if (keyBytes.length <= offset) continue;
    try {
      const decoded = api.createType("AcalaPrimitivesCurrencyCurrencyId", keyBytes.slice(offset));
      return decoded;
    } catch {}
  }

  throw new Error(
    `Cannot decode CurrencyId, first 64 bytes: ${Buffer.from(keyBytes.slice(0, 64)).toString("hex")}`,
  );
}

/**
 * 将 CurrencyId.toHuman() 的输出转为统一 symbol 字符串
 */
function currencyIdToSymbol(human) {
  if (!human) return null;
  if (typeof human === "string") return human;

  const token = human.Token ?? human.token;
  const foreignAsset = human.ForeignAsset ?? human.foreignAsset;
  const erc20 = human.Erc20 ?? human.erc20;
  const liquidCrowdloan = human.LiquidCrowdloan ?? human.liquidCrowdloan;
  const stableAssetPoolId = human.StableAssetPoolToken ?? human.stableAssetPoolId;
  const dexShare = human.DexShare ?? human.dexShare;

  if (token)                     return token;
  if (foreignAsset != null)      return `FA(${foreignAsset})`;
  if (erc20)                     return `ERC20(${erc20})`;
  if (liquidCrowdloan != null)   return `LCDOT(${liquidCrowdloan})`;
  if (stableAssetPoolId != null) return `StableAsset(${stableAssetPoolId})`;
  if (dexShare) {
    const [a, b] = dexShare;
    return `LP(${currencyIdToSymbol(a)}/${currencyIdToSymbol(b)})`;
  }

  return JSON.stringify(human);
}

// ========== 主流程 ==========

(async () => {
  const api = await getApi();

  const [chain, nodeName, nodeVer] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);
  const header = await api.rpc.chain.getHeader();

  console.log("=".repeat(80));
  console.log("  Acala 链上资产查询");
  console.log("=".repeat(80));
  console.log(`  链: ${chain}  |  节点: ${nodeName} v${nodeVer}  |  区块: #${header.number}\n`);

  // --- 1. 从 tokens.totalIssuance 拿到所有资产 ---
  const issuanceEntries = await api.query.tokens.totalIssuance.entries();
  console.log(`  [tokens.totalIssuance] 条目: ${issuanceEntries.length} 个\n`);

  const assets = [];

  for (const [key, issuance] of issuanceEntries) {
    const currencyId = decodeCurrencyId(api, key);
    const human = currencyId.toHuman();
    const sym = currencyIdToSymbol(human);

    const entry = {
      currencyId,
      symbol: sym || JSON.stringify(human),
      issuance,
      name: sym || JSON.stringify(human),
      decimals: 12,
    };

    assets.push(entry);
  }

  // --- 2. 逐个查 assetRegistry.assetMetadatas(currencyId) 获取 name/decimals ---
  // 避免手动解码 assetRegistry 的 storage key (其 hasher 结构与 tokens 不同)
  console.log("  正在查询 assetRegistry 元数据...");
  let metaCount = 0;
  for (const a of assets) {
    try {
      const meta = await api.query.assetRegistry.assetMetadatas(a.currencyId);
      const m = meta.toHuman();
      if (m) {
        a.name = m.name || a.symbol;
        a.decimals = Number(m.decimals) || 12;
        metaCount++;
      }
    } catch {}
    // 也补查 KNOWN 表
    if (KNOWN[a.symbol]) {
      a.name = KNOWN[a.symbol].name;
      a.decimals = KNOWN[a.symbol].decimals;
    }
  }
  console.log(`  已获取: ${metaCount} 个\n`);

  // 按 issuance 降序
  assets.sort((a, b) => {
    const ai = toBigInt(a.issuance);
    const bi = toBigInt(b.issuance);
    return bi > ai ? 1 : bi < ai ? -1 : 0;
  });

  // --- 3. oracle 价格 ---
  console.log("  正在查询 Oracle 价格...\n");

  for (const a of assets) {
    try {
      const raw = await api.query.acalaOracle.values(a.currencyId);
      if (raw.isSome) {
        a.oracleRaw = raw.unwrap().value.toString();
      }
    } catch {}
  }

  // --- 4. 输出概览 ---
  console.log("=".repeat(80));
  console.log("  概览");
  console.log("=".repeat(80) + "\n");

  const W = [20, 22, 28, 22, 22];
  row(["Symbol", "名称", "总发行量", "单价 (USD)", "总价值 (USD)"], W);
  sep(W);

  for (const a of assets) {
    const supply = formatSupply(a.issuance, a.decimals);
    let priceStr = "n/a";
    let totalStr = "n/a";

    if (a.oracleRaw) {
      const price = Number(toBigInt(a.oracleRaw)) / 1e18;
      priceStr = fmtUSD(price);
      const supplyNum = parseFloat(supply.replace(/,/g, ""));
      if (!isNaN(supplyNum)) totalStr = fmtUSD(supplyNum * price);
    }

    const sym = a.symbol.length > 18 ? a.symbol.slice(0, 17) + "…" : a.symbol;
    const name = a.name.length > 20 ? a.name.slice(0, 19) + "…" : a.name;
    row([sym, name, supply, priceStr, totalStr], W);
  }

  sep(W);
  console.log(`\n  共 ${assets.length} 个资产\n`);

  // --- 5. 详细信息 ---
  console.log("=".repeat(80));
  console.log("  详细信息");
  console.log("=".repeat(80) + "\n");

  for (const a of assets) {
    const supply = formatSupply(a.issuance, a.decimals);
    console.log(`--- ${a.symbol} (${a.name}) ---`);
    console.log(`  decimals:      ${a.decimals}`);
    console.log(`  issuance raw:  ${a.issuance}`);
    console.log(`  supply:        ${supply}`);
    if (a.oracleRaw) {
      const price = Number(toBigInt(a.oracleRaw)) / 1e18;
      console.log(`  oracle raw:    ${a.oracleRaw} (FixedU128)`);
      console.log(`  price:         ${fmtUSD(price)}`);
      const supplyNum = parseFloat(supply.replace(/,/g, ""));
      if (!isNaN(supplyNum)) {
        console.log(`  total value:   ${fmtUSD(supplyNum * price)}`);
      }
    } else {
      console.log(`  oracle:        无价格`);
    }
    console.log();
  }

  console.log("  完成.\n");
  process.exit(0);
})();

// ========== 格式化输出 ==========

function sep(widths) {
  console.log("  " + widths.map((w) => "-".repeat(w)).join(""));
}

function row(cells, widths) {
  console.log(
    "  " + cells.map((c, i) => String(c).slice(0, widths[i]).padEnd(widths[i])).join(""),
  );
}
