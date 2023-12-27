const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const defaultBifrostEndPoint = "wss://polkadot-collectives-rpc.dwellir.com/";

async function getApi() {
  if (api) {
    return api;
  }

  provider = new WsProvider(defaultBifrostEndPoint, 10);
  const options = { provider };

  api = await ApiPromise.create(options);
  return api;
}

module.exports = {
  getApi,
}
