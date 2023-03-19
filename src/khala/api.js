const { ApiPromise, WsProvider } = require("@polkadot/api");
const { khala } = require("@osn/provider-options");

let provider = null;
let api = null;

const polkadotEndPoint = "wss://khala.api.onfinality.io/public-ws";

async function init() {
  provider = new WsProvider(polkadotEndPoint);
  api = await ApiPromise.create({
    provider,
    khala,
  });
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
