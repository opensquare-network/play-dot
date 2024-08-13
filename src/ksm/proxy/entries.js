const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const height = 3044295;
  // const height = 	2672216;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  const entries = await blockApi.query.proxy.proxies.entries();
  for (const [storageKey, value] of entries) {
    const delegator = storageKey.args[0].toString();
    console.log(value);
  }

  process.exit(0);
})();
