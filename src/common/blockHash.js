async function findBlockHash(height, api) {
  return api.rpc.chain.getBlockHash(height);
}

async function findParentBlockHash(height, api) {
  return api.rpc.chain.getBlockHash(height - 1);
}

async function findBlockApiByHeight(height, api) {
  const blockHash = await findBlockHash(height, api)
  return await api.at(blockHash);
}

module.exports = {
  findBlockHash,
  findParentBlockHash,
  findBlockApiByHeight,
}
