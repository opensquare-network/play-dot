const { getApi } = require("../api");

const section = 'automationTime';
const scheduled = 'TaskScheduled';

;(async () => {
  const api = await getApi();

  const height = 6711;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  const eves = blockApi.events;

  const allEvents = await api.query.system.events.at(blockHash);

  const event = (allEvents || []).find(({ event }) => event.section === section && event.method === scheduled);
  const taskId = event.event.data[1].toString();
  const task = await blockApi.query.automationTime.tasks(taskId);
  console.log(task.toJSON(0));

  process.exit(0);
})()
