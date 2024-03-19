const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const account = '4dpEcgqJRyJK3J8Es6v8ZfVntV7c64Ysgcjd4hYwyGoFPWbg';
  const dotBalance = await api.query.ormlTokens.accounts(account, { ForeignAsset: 5 });
  console.log(dotBalance.toJSON());

  process.exit(0);
})();
