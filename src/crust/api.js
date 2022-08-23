const { ApiPromise, WsProvider } = require("@polkadot/api");
const { crustOptions } = require("./options/curst");

let provider = null;
let api = null;

const crustEndPoint = "wss://crust.api.onfinality.io/public-ws";

async function init() {
  provider = new WsProvider(crustEndPoint);
  api = await ApiPromise.create({ provider, ...crustOptions });
}

async function getApi() {
  if (!api) {
    await init()
  }

  return api;
}

async function getProvider() {
  if (!provider) {
    await init();
  }

  return provider;
}

module.exports = {
  getApi,
  getProvider,
}
