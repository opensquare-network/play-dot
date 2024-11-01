const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

async function init(endPoint) {
  provider = new WsProvider(endPoint);
  api = await ApiPromise.create({ provider });
}

async function getCommonApi(endPoint) {
  if (!api) {
    await init(endPoint)
  }

  return api;
}

async function getCommonProvider(endPoint) {
  if (!provider) {
    await init(endPoint);
  }

  return provider;
}

module.exports = {
  getCommonApi,
  getCommonProvider,
}
