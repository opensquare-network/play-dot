const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const kusamaEndPoint = "wss://kusama.api.onfinality.io/public-ws";
// const kusamaEndPoint = "wss://kusama-rpc.polkadot.io";
// const kusamaEndPoint = "wss://kusama.public.curie.radiumblock.xyz/ws";

// const kusamaAssethubEndPoint = "wss://assethub-kusama.api.onfinality.io/public-ws";
const kusamaAssethubEndPoint = "wss://rpc-asset-hub-kusama.luckyfriday.io";

async function init() {
  provider = new WsProvider(kusamaAssethubEndPoint);
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
