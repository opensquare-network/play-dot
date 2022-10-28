const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const kusamaEndPoint = "wss://kusama.api.onfinality.io/public-ws";
const kusamaEndPoint = "wss://governance2-testnet.litentry.io";

async function init() {
  provider = new WsProvider(kusamaEndPoint);
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
