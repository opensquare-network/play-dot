const { getApi } = require("../../../api");

const gav = "FcxNWVy5RESDsErjwyZmPCW6Z8Y3fbfLzmou34YZTrbcraL";

;(async () => {
  const api = await getApi();
  const height = 15598379;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const record = await blockApi.query.fellowshipCollective.members(gav);
  console.log(record.toJSON())

  const info = await blockApi.query.fellowshipReferenda.referendumInfoFor(0);
  console.log(info.toJSON());

  process.exit(0);
})();
