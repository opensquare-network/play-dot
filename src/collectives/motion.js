const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const height = 775159;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const proposals = await blockApi.query.allianceMotion.proposals();
  console.log(proposals.toJSON());
  process.exit(0);
})();
