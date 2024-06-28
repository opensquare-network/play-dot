const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const height = 2672216;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  const delegator = "Enp2Twdwwsk16n2jFHU9cNTDoEbn2KQD7TTczMZWfoL5Yd7";
  const storage = await blockApi.query.proxy.proxies(delegator);

  console.log(storage);
  process.exit(0);
})();
