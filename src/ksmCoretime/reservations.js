const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const rawEntries = await api.query.broker.reservations();

  process.exit(0);
})();
