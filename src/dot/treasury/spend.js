const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const height = 20911281;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await api.at(blockHash);
  const spend = await blockApi.query.treasury.spends(0);
  console.log(spend.toJSON());

  process.exit(0);
})();
