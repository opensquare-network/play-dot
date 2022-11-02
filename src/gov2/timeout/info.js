const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 247351;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const referendumInfoOf = await blockApi.query.referenda.referendumInfoFor(7);
  console.log(referendumInfoOf.toJSON());
})();
