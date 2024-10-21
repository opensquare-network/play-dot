const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const raw = await api.query.bounties.bounties(33);
  console.log(raw.toJSON())

  process.exit(0);
})();
