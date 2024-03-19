const { getApi } = require("./api");

;(async () => {
  const api = await getApi();

  const height = 697787;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const hex = "0x1b00504372656174652066726f6d206d6574616d61736b45544800dca962b899641d60ccf7268a2260f20b6c01c06d0000000000000000";
  const proposal = blockApi.registry.createType("Proposal", hex);
  console.log(proposal);
  process.exit(0);
})();
