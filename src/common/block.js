async function getBlock(api, height) {
  const blockHash = await api.rpc.chain.getBlockHash(height);
  return await api.rpc.chain.getBlock(blockHash);
}

module.exports = {
  getBlock,
}
