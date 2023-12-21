const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const height = 4060641; //2035
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const raw = await blockApi.query.democracy.nextExternal();
  console.log(raw.toJSON());
  process.exit(0);
})();
