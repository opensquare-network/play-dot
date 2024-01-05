const { ApiPromise, WsProvider } = require("@polkadot/api");
const endpoint = "wss://rpc.nice.hydration.cloud/";

let provider = null;
let api = null;

async function getApi() {
  if (!api) {
    provider = new WsProvider(endpoint);
    const options = {
      provider,
    };

    api = await ApiPromise.create(options);
  }

  return api;
}

module.exports = {
  getApi,
}
