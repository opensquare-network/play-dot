const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 10178000;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await api.at(blockHash)
  const childBounty = await blockApi.query.childBounties.childBounties(11, 0);
  console.log(childBounty.toJSON())

  process.exit(0)
})()
