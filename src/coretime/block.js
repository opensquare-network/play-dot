const { getCommonApi } = require("../common/api");
const { getBlockIndexer } = require("../common/block");
(async () => {
  const api = await getCommonApi("wss://polkadot-coretime-rpc.polkadot.io");
  const blockHeight = 2461664;
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  const block = await api.rpc.chain.getBlock(blockHash);

  const indexer = getBlockIndexer(block.block);
  console.log(indexer.blockTime);

  process.exit(0);
})();
