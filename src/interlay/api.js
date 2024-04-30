const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const intrEndPoint = "wss://rpc-interlay.luckyfriday.io/";
const intrEndPoint = "wss://api.interlay.io/parachain";

async function getApi() {
  if (!api) {
    provider = new WsProvider([intrEndPoint, "wss://rpc-interlay.luckyfriday.io/"]);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

module.exports = {
  getApi,
}
