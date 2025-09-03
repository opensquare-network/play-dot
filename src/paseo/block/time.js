const { getCommonApi } = require("../../common/api");
const { getBlockIndexer } = require("../../common/block");

(async () => {
  const api = await getCommonApi("wss://pas-rpc.stakeworld.io");
  const blockHeight = 7899176;
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  const block = await api.rpc.chain.getBlock(blockHash);
  const indexer = getBlockIndexer(block.block);

  console.log(indexer);
  process.exit(0);
  // todo: 1. get block hash
})();
