const { getApi } = require("./api");
;(async () => {
  const api = await getApi();
  // const height = 1728000;
  const height = 11429091;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await api.at(blockHash);
  const events = await blockApi.query.system.events()
  console.log(events);
})()
