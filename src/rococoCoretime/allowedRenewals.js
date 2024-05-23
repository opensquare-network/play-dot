const { getApi } = require("./api");

;(async () => {
  const api = await getApi();

  const rawEntries = await api.query.broker.allowedRenewals.entries();
  for (const [storageKey, storageValue] of rawEntries) {
    const key = storageKey.args[0].toJSON();

    console.log("key", key, "value", storageValue.toJSON());
  }

  process.exit(0);
})();
