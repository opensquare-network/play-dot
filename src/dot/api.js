const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const polkadotEndPoint = "wss://rpc.polkadot.io";

async function init() {
  provider = new WsProvider(polkadotEndPoint);
  api = await ApiPromise.create({ provider });
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
