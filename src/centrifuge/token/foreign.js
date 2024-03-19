const { getApi } = require("../api");

;(async () => {
  const api = await getApi();

  const treasuryAccount = '4dpEcgqJRyJK3J8Es6v8ZfVntV7c64Ysgcjd4hYwyGoFPWbg';
  const dotValue = await api.query.ormlTokens.accounts(treasuryAccount, { ForeignAsset: 5 });

  console.log(dotValue.toJSON()); // { free: 87990000, reserved: 0, frozen: 0 }
  process.exit(0);
})();
