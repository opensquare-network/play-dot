const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 82406;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const referenda = await blockApi.query.referenda;
  const referendumInfoOf = await referenda.referendumInfoFor(3);

  console.log(referendumInfoOf.unwrap().asOngoing.toJSON())

  process.exit(0);
})();
