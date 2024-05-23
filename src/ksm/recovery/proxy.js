const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const entries = await api.query.recovery.proxy.entries();
  for (const [storageKey, value] of entries) {
    const rescuer = storageKey.args[0].toString();

    console.log("rescuer", rescuer, "lost", value.unwrap().toString());
  }

  process.exit(0);
})();
