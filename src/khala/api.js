const { ApiPromise, WsProvider } = require("@polkadot/api");
const { versionedKhala } = require("@phala/typedefs");

const typesBundle = {
  spec: {
    khala: {
      alias: {},
      rpc: {},
      types: versionedKhala
    }
  }
}

let provider = null;
let api = null;

const polkadotEndPoint = "wss://khala.api.onfinality.io/public-ws";

async function init() {
  provider = new WsProvider(polkadotEndPoint);
  api = await ApiPromise.create({
    provider,
    typesBundle,
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
