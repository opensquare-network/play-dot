const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 19573297;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await api.at(blockHash);
  const entries = await blockApi.query.scheduler.agenda.entries();
  for (const [storageKey, boundedVec] of entries) {
    console.log("storageKey", storageKey);
    console.log("boundedVec", boundedVec);
    const when = storageKey.args[0].toNumber();
  }
})();
