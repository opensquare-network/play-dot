const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  // const height = 25947;
  // const height = 38244;
  // const height = 1835942;
  const height = 4614887;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await api.at(blockHash);
  const raw = await blockApi.query.democracy.publicProps();
  const allProposals = raw.toJSON() || [];
  const target = allProposals.find(([index]) => index === 10);

  console.log(target);

  process.exit(0)
})()
