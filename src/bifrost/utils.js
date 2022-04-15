const { getBncApi } = require("./api");

async function getBlockHash(height) {
  const api = await getBncApi();
  return await api.rpc.chain.getBlockHash(height);
}

async function findBlockApi(height) {
  const api = await getBncApi();
  const blockHash = await getBlockHash(height);
  return api.at(blockHash);
}

module.exports = {
  getBlockHash,
  findBlockApi,
}
