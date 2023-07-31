const { ApiPromise, WsProvider } = require("@polkadot/api");
const interlay = require("./types");

let provider = null;
let api = null;

// const kintEndPoint = "wss://api-dev-kintsugi.interlay.io/parachain";
const kintEndPoint = "wss://api.interlay.io/parachain";

async function getApi() {
  if (!api) {
    provider = new WsProvider(kintEndPoint);
    api = await ApiPromise.create({ provider, ...interlay });
  }

  return api;
}

module.exports = {
  getApi,
}
