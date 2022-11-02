const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 16687;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const what = await blockApi.query.scheduler.agenda(16688);
  const call = what[0].unwrap().call.toJSON().inline;
  try {
    const rawCall = blockApi.registry.createType("Proposal", call);
    console.log(rawCall.section, rawCall.method)
  } catch (e) {
    console.log(e)
  }

  process.exit(0)
})();
