const { getApi } = require("./api");

async function query() {
  const api = await getApi();
  const rawStatus = await api.query.fellowshipCore.params();
  console.log(rawStatus.toJSON());
}

;(async () => {
  await query();

  process.exit(0);
})();
