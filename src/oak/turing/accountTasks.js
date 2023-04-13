const { getApi } = require("./api");

;(async () => {
  const api = await getApi();

  const height = 2352548;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const taskId = "0xc5bbcadd73da52215de491ce534199e2ed22b9d0b3dc891677b60963d2e31815";
  const owner = "0xb8070e3b0de78811c7e46f63a5df06426d3b26fbe44c5fffe3a0cc9984da925d";
  const task = await blockApi.query.automationTime.accountTasks(owner, taskId);
  console.log(task.unwrap().toJSON());
})();
