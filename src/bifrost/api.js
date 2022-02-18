const { ApiPromise, WsProvider } = require("@polkadot/api");
const {
  typesBundleForPolkadot: bifrostTypesBundleForPolkadot,
  rpc,
} = require("@bifrost-finance/type-definitions");

let provider = null;
let api = null;

const defaultBifrostEndPoint = "wss://bifrost-parachain.api.onfinality.io/public-ws";

async function getApi() {
  if (api) {
    return api;
  }

  provider = new WsProvider(defaultBifrostEndPoint, 10);
  const options = {
    provider,
    typesBundle: {
      spec: {
        bifrost: bifrostTypesBundleForPolkadot.spec.bifrost,
        "bifrost-parachain": bifrostTypesBundleForPolkadot.spec.bifrost,
      },
    },
    rpc,
  };

  api = await ApiPromise.create(options);
  return api;
}

module.exports = {
  getBncApi: getApi,
}
