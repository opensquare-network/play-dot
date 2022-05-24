const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 955139;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const allEvents = await api.query.system.events.at(blockHash);

  const batchEvents = allEvents.filter((event) => {
    const { phase } = event;
    return !phase.isNull && phase.value.toNumber() === 3;
  });


  console.log(batchEvents);
})()
