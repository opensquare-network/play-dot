const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const rawEntries = await api.query.broker.workplan.entries();
  for (const [storageKey, rawSchedule] of rawEntries) {
    const key = storageKey.args[0].toJSON();
    console.log("time-slice:", key[0], "core-index", key[1]);
    if (rawSchedule.isNone) {
      continue;
    }

    for (const rawItem of rawSchedule.unwrap()) {
      console.log("assignment", rawItem.assignment.toJSON());
    }
  }

  process.exit(0);
})();
