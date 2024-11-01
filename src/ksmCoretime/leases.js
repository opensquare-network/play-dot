const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const rawEntries = await api.query.broker.leases();

  process.exit(0);
})();
