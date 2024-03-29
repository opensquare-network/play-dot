const { getApi } = require("./api");

;(async () => {
  const api = await getApi();

  const blockHash = await api.rpc.chain.getBlockHash(1322979);
  const block = await api.rpc.chain.getBlock(blockHash);

  console.log(block);

  process.exit(0);
})()
