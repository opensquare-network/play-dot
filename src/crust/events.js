const { getApi } = require("./api");
;(async () => {
  const api = await getApi();

  const height = 202247;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const allEvents = await api.query.system.events.at(blockHash);

  console.log('allEvents', allEvents);
})();
