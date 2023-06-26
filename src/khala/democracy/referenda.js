const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  // const height = 2872800;
  // const height = 3286200;
  const height = 3974856;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const raw = await blockApi.query.democracy.referendumInfoOf(69);
  // const voters = await blockApi.query.democracy.votersFor(0);
  console.log(raw.toJSON());
  process.exit(0);
})();
