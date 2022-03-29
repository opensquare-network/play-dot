const { getKarApi } = require("../api");

;(async () => {
  const api = await getKarApi();
  const entries = await api.query.tokens.accounts.entries();

  console.log(entries.toJSON());
})();
