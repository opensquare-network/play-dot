const { ApiPromise, WsProvider } = require("@polkadot/api");
const { shibuya } = require("@osn/provider-options");

let provider = null;
let api = null;

const endpoint = "wss://shibuya-rpc.dwellir.com/";

async function init() {
  provider = new WsProvider(endpoint);
  api = await ApiPromise.create({
    provider,
    ...shibuya,
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
