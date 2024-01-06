const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const endPoint = "wss://rococo-rpc.polkadot.io/";
const endPoint = "wss://karura-rpc-2.aca-api.network/ws";
// const endPoint = "wss://rpc.polkadot.io/";

async function init() {
  provider = new WsProvider(endPoint);
  api = await ApiPromise.create({ provider, });
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
