const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  // const height = 1574000;
  const height = 1713599;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const raw = await blockApi.query.democracy.referendumInfoOf(43);
  // const voters = await blockApi.query.democracy.votersFor(0);
  console.log(raw.toJSON())
  process.exit(0);
})();
