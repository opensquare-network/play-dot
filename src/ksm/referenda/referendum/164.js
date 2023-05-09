const { getApi } = require("../../api");

(async () => {
  const api = await getApi();
  const height = 17536642;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const info = await blockApi.query.referenda.referendumInfoFor(164);
  console.log(info);
  process.exit(0);
})();
