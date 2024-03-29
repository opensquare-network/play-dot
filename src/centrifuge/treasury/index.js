const { getApi } = require("../api");
const { findBlockApiByHeight } = require("../../common/blockHash");

;(async () => {
  const api = await getApi();
  const account = '4dpEcgqJRyJK3J8Es6v8ZfVntV7c64Ysgcjd4hYwyGoFPWbg';
  // const dotBalance = await api.query.ormlTokens.accounts(account, { ForeignAsset: 6 });
  const blockApi = await findBlockApiByHeight(5139000 - 1, api);
  const rawAccount = await blockApi.query.system.account(account);
  console.log(rawAccount.data.free.toString());

  process.exit(0);
})();
