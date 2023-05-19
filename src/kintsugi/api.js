const { ApiPromise, WsProvider } = require("@polkadot/api");
const kintsugi = require("./types");

let provider = null;
let api = null;

// const kintEndPoint = "wss://api-dev-kintsugi.interlay.io/parachain";
const kintEndPoint = "wss://kintsugi.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(kintEndPoint);
    api = await ApiPromise.create({ provider, ...kintsugi });
  }

  return api;
}

module.exports = {
  getApi,
}
