const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const polkadotEndPoint = "wss://rpc.polkadot.io";
// const polkadotEndPoint = "wss://polkadot-rpc.dwellir.com";
// const polkadotEndPoint = "wss://polkadot-rpc-tn.dwellir.com";
const polkadotEndPoint = "wss://rpc.ibp.network/polkadot";
// const polkadotEndPoint = "wss://rpc.dotters.network/polkadot";
// const polkadotEndPoint = "wss://polkadot.public.curie.radiumblock.co/ws";

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
