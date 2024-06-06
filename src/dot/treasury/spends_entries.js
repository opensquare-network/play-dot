const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const height = 20759055;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await api.at(blockHash);
  const entries = await blockApi.query.treasury.spends.entries();
  for (const [storageKey, spendStatus] of entries) {
    console.log("index", storageKey.args[0].toNumber());
    if (spendStatus.isNone) {
      continue;
    }
    console.log("status", JSON.stringify(spendStatus.unwrap().toJSON(), null, 2));
  }

  process.exit(0);
})();
