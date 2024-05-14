const { getApi } = require("./api");

;(async () => {
  const api = await getApi();

  const height = 	139725;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const rawInfo = await blockApi.query.broker.saleInfo();
  console.log(rawInfo.toJSON());

  process.exit(0);
})();
