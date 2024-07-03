const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const account = "14xmwinmCEz6oRrFdczHKqHgWNMiCysE2KrA4jXXAAM1Eogk";
  const assetId = 1984;

  const accountStorage = await api.query.assets.account(assetId, account);

  console.log(accountStorage);
})();
