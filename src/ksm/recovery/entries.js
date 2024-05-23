const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const entries = await api.query.recovery.recoverable.entries();
  for (const [storageKey, value] of entries) {
    const who = storageKey.args[0].toString();
    console.log("who", who, "value", value.toJSON());
  }

  process.exit(0);
})();
