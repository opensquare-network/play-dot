const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 151799;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const raw = await blockApi.query.council.voting("0x59fe7bd64951667f91f36db33077b1ada93b093b363a32cf869d2a833d72ce08");
  console.log(raw.toJSON())
  process.exit(0);
})();
