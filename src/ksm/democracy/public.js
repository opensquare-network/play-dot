const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  // const height = 1574000;
  const height = 25947;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const raw = await blockApi.query.democracy.publicProps();
  const allProposals = raw.toJSON() || [];
  // const voters = await blockApi.query.democracy.votersFor(0);
  console.log(allProposals);
  process.exit(0);
})();
