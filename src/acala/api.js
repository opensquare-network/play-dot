const { ApiPromise, WsProvider } = require("@polkadot/api");
const defaultKaruraEndPoint = "wss://acala-rpc-1.aca-api.network";
const { karuraOptions } = require("@osn/provider-options")

let provider = null;
let api = null;

async function getApi() {
  if (!api) {
    provider = new WsProvider(defaultKaruraEndPoint);
    const options = {
      ...karuraOptions,
      provider,
    };

    api = await ApiPromise.create(options);
  }

  return api;
}

module.exports = {
  getApi,
}
