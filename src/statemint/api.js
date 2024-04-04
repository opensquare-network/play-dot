const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const statemineEndPoint = "wss://statemint-rpc.dwellir.com/";
const statemineEndPoint = "wss://sys.dotters.network/statemint";

async function getApi() {
  if (!api) {
    provider = new WsProvider(statemineEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

module.exports = {
  getApi,
}
