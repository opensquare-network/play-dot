const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const height = 100786;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockFromNode = await api.rpc.chain.getBlock(blockHash);
  console.log(blockFromNode);
  process.exit(0);
})();
