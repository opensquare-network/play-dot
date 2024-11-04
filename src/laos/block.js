const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://rpc.laos.laosfoundation.io/");
  const blockHash = await api.rpc.chain.getBlockHash(54521);
  const block = await api.rpc.chain.getBlock(blockHash);
  const allEvents = await api.query.system.events.at(blockHash);

  console.log(block);

  process.exit(0);
})();
