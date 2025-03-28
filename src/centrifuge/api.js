const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const kusamaEndPoint = "wss://kusama.api.onfinality.io/public-ws";
// const kusamaEndPoint = "wss://fullnode.parachain.centrifuge.io/";
const cfgEndPoint = "wss://centrifuge-parachain.api.onfinality.io/public-ws";
// const kusamaEndPoint = "wss://kusama.public.curie.radiumblock.xyz/ws";

async function init() {
  provider = new WsProvider(cfgEndPoint);
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
