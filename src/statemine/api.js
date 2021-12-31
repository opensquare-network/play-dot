const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const kintEndPoint = "wss://api-dev-kintsugi.interlay.io/parachain";
const statemineEndPoint = "wss://statemine.api.onfinality.io/public-ws";

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
