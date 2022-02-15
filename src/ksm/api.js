const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const kusamaEndPoint = "wss://kusama.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(kusamaEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

module.exports = {
  getApi,
}
