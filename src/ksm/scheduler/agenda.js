const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const height = 2075651;
  const blockHash = await api.rpc.chain.getBlockHash(height - 1);
  const blockApi = await api.at(blockHash);

  const agenda = await blockApi.query.scheduler.agenda(height);

  console.log(agenda);
  process.exit(0);
})();
