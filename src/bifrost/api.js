const { ApiPromise, WsProvider } = require("@polkadot/api");
const { bifrostOptions } = require("@osn/provider-options")

let provider = null;
let api = null;

// const defaultBifrostEndPoint = "wss://bifrost-parachain.api.onfinality.io/public-ws";
const defaultBifrostEndPoint = "wss://bifrost-rpc.liebi.com/ws";

async function getApi() {
  if (api) {
    return api;
  }

  provider = new WsProvider(defaultBifrostEndPoint, 10);
  const options = {
    ...bifrostOptions,
    provider,
  };

  api = await ApiPromise.create(options);
  return api;
}

module.exports = {
  getBncApi: getApi,
}
