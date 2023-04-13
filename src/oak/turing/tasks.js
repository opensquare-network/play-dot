const { getApi } = require("./api");

;(async () => {
  const api = await getApi();

  const height = 511783;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const taskId = "0x43415f2c32217f77d900760b223dabf11440577657c8adb4a6ee854e9c950392";
  const task = await blockApi.query.automationTime.tasks(taskId);
  console.log(task);
})();
