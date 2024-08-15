const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const height = 62150;

  const blockHash = await api.rpc.chain.getBlockHash(height);
  const block = await api.rpc.chain.getBlock(blockHash);
  const allEvents = await api.query.system.events.at(blockHash);

  console.log("block", block, "events", allEvents);

  process.exit(0);
})();
