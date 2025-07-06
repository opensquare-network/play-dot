const { ApiPromise, WsProvider } = require("@polkadot/api");
const { findBlockHash } = require("./blockHash");

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

async function findBlockApi(api, height) {
  const blockHash = await findBlockHash(height, api);
  return await api.at(blockHash);
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
  findBlockApi,
}
