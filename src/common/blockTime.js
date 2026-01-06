const { getCommonApi } = require("./api");
const { getBlock, getBlockIndexer } = require("./block");

(async () => {
  const api = await getCommonApi("wss://polkadot-asset-hub-rpc.polkadot.io");
  const block = await getBlock(api, 10258185);

  const indexer = getBlockIndexer(block.block);
  console.log("indexer", indexer);
  process.exit(0);
})();
