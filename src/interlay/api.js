const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const intrEndPoint = "wss://rpc-interlay.luckyfriday.io/";

async function getApi() {
  if (!api) {
    provider = new WsProvider(intrEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

module.exports = {
  getApi,
}
