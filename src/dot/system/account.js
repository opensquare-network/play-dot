const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 891;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const entries = await blockApi.query.system.account.entries();
  console.log(entries.length);
  process.exit(0);
})();
