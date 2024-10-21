const { getApi } = require("./api");

(async () => {
  const api = await getApi();
  const storage = await api.query.broker.configuration();
  console.log(storage.toJSON());

  process.exit(0);
})();
