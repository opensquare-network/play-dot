const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const height = 56180;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const referenda = await blockApi.query.referenda;
  const count = await referenda.referendumCount();
  const referendumInfoOf = await referenda.referendumInfoFor(1);

  console.log("Count", count.toNumber());
  console.log(referendumInfoOf.unwrap().asOngoing.toJSON())

  process.exit(0);
})();
