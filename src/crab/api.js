const { crabOptions } = require("./option");
const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const neuEndPoint = "wss://darwinia-crab.api.onfinality.io/public-ws";

async function init() {
  provider = new WsProvider(neuEndPoint);
  api = await ApiPromise.create({ provider, ...crabOptions });
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
