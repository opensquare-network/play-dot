const { getApi } = require("../../../api");

;(async () => {
  const api = await getApi();
  // 15654428
  const height = 15654380;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const info = await blockApi.query.fellowshipReferenda.referendumInfoFor(9);
  console.log(info.unwrap().asOngoing.tally.toJSON());

  process.exit(0);
})();
