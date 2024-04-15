const { gate: Gate } = require("ccxt");
const gate = new Gate();

(async () => {
  const symbol = "CFG_USDT";
  const markets = await gate.fetchOHLCV(symbol, '1w');
  console.log(gate, markets);
})();
