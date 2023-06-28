const { ApiPromise, WsProvider } = require("@polkadot/api");
const { types } = require("./types");

let provider = null;
let api = null;

const endPoint = "wss://mainnet-rpc.stafi.io/";

async function init() {
  provider = new WsProvider(endPoint);
  api = await ApiPromise.create({ provider, types });
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
