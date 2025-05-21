const { getCommonApi } = require("../common/api");
const { getBlockIndexer } = require("../common/block");

(async () => {
  const api = await getCommonApi("wss://westend-rpc.polkadot.io/");
  const height = 26041579;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const block = await api.rpc.chain.getBlock(blockHash);

  const indexer = getBlockIndexer(block.block);
  console.log(indexer);

  process.exit(0);
})();
