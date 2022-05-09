const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 1926382;
  const blockHash = await api.rpc.chain.getBlockHash(height - 1);
  const blockApi = await api.at(blockHash);

  const raw = await blockApi.query.democracy.nextExternal();
  console.log(raw.toJSON(0))
  process.exit(0);
})();
