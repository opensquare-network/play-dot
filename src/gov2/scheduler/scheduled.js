const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 86482;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const allEvents = await api.query.system.events.at(blockHash);
  const scheduledEvent = allEvents[1].event;

  const when = scheduledEvent.data[0].toNumber()
  const idx = scheduledEvent.data[1].toNumber()

  const tasks = await blockApi.query.scheduler.agenda(when);
  const task = tasks[idx];

  console.log(task.toJSON());
  process.exit(0);
})()
