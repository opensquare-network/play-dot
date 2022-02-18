const { ApiPromise, WsProvider } = require("@polkadot/api");
const defaultKaruraEndPoint = "wss://karura.polkawallet.io";
const {
  rpc: acalaRpc,
  typesAlias: acalaTypesAlias,
  typesBundle: acalaTypesBundle,
  signedExtensions: acalaSignedExtensions
} = require('@acala-network/types');
const { derive: ormlDerives } = require('@open-web3/orml-api-derive');
const { derive: acalaDerives } = require('@acala-network/api-derive');

let provider = null;
let api = null;

async function getApi() {
  if (!api) {
    provider = new WsProvider(defaultKaruraEndPoint);
    const options = {
      rpc: {
        ...acalaRpc,
      },
      typesAlias: {
        ...acalaTypesAlias,
      },
      typesBundle: {
        spec: {
          acala: {
            ...acalaTypesBundle?.spec?.acala,
          },
          mandala: {
            ...acalaTypesBundle?.spec?.mandala,
          },
          karura: {
            ...acalaTypesBundle?.spec?.karura,
          }
        }
      },
      signedExtensions: {
        ...acalaSignedExtensions,
      },
      derives: {
        ...ormlDerives,
        ...acalaDerives
      },
      provider,
    };

    api = await ApiPromise.create(options);
  }

  return api;
}

module.exports = {
  getKarApi: getApi,
}
