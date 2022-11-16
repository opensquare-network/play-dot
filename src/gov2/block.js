const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const height = 852965;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  console.log(blockHash.toString())

  process.exit(0);
})();
