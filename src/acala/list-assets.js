const { getApi } = require("./api");

// ========== 工具 ==========

function decodeCurrencyId(api, keyArg) {
  const keyBytes =
    keyArg instanceof Uint8Array ? keyArg : Buffer.from(keyArg.slice(2), "hex");
  for (const off of [48, 40, 32, 16, 8, 0]) {
    if (keyBytes.length <= off) continue;
    try {
      return api.createType("AcalaPrimitivesCurrencyCurrencyId", keyBytes.slice(off));
    } catch {}
  }
  return null;
}

function shortERC20(addr) {
  return addr.length > 12 ? `${addr.slice(0, 6)}..${addr.slice(-4)}` : addr;
}

function currencyIdToSymbol(human) {
  if (!human) return null;
  if (typeof human === "string") return human;
  const token = human.Token ?? human.token;
  const fa = human.ForeignAsset ?? human.foreignAsset;
  const erc20 = human.Erc20 ?? human.erc20;
  const lc = human.LiquidCrowdloan ?? human.liquidCrowdloan;
  const stable = human.StableAssetPoolToken ?? human.stableAssetPoolId;
  const ds = human.DexShare ?? human.dexShare;
  if (token) return token;
  if (fa != null) return `FA(${fa})`;
  if (erc20) return `ERC20(${shortERC20(erc20)})`;
  if (lc != null) return `LCDOT(${lc})`;
  if (stable != null) return `Stable(${stable})`;
  if (ds) {
    const [a, b] = ds;
    return `LP(${currencyIdToSymbol(a)}-${currencyIdToSymbol(b)})`;
  }
  return JSON.stringify(human);
}

// ========== 主流程 ==========

(async () => {
  const api = await getApi();

  // tokens.totalIssuance 条目
  const entries = await api.query.tokens.totalIssuance.entries();
  const assets = [];

  for (const [key, issuance] of entries) {
    const currencyId = decodeCurrencyId(api, key);
    if (!currencyId) continue;

    const symbol = currencyIdToSymbol(currencyId.toHuman());
    assets.push({ symbol, currencyId, issuance });
  }

  // 输出表格
  assets.sort((a, b) => {
    const ai = BigInt(String(a.issuance));
    const bi = BigInt(String(b.issuance));
    return bi > ai ? 1 : bi < ai ? -1 : 0;
  });

  console.log(`Acala 链上资产 (共 ${assets.length} 个)\n`);

  const w = [32, 38, 18];
  const header = ["Symbol", "Total Issuance (raw)", "Type"];
  row(header, w);
  sep(w);

  for (const a of assets) {
    const type = classify(a.symbol);
    row([a.symbol, String(a.issuance), type], w);
  }
  sep(w);

  process.exit(0);
})();

function classify(sym) {
  if (sym.startsWith("LP(")) return "DexShare (LP)";
  if (sym.startsWith("FA(")) return "ForeignAsset";
  if (sym.startsWith("ERC20(")) return "ERC20";
  if (sym.startsWith("LCDOT(")) return "LiquidCrowdloan";
  if (sym.startsWith("Stable(")) return "StableAssetPool";
  return "Token";
}

function sep(widths) {
  console.log("  " + widths.map((w) => "-".repeat(w)).join(""));
}

function row(cells, widths) {
  console.log(
    "  " + cells.map((c, i) => String(c).slice(0, widths[i]).padEnd(widths[i])).join(""),
  );
}
