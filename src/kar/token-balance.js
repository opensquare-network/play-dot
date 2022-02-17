const { getKarApi } = require("./api");

;(async () => {
  const api = await getKarApi();

  debugger
  const account = '5Dw5KnvTs96FaRQFez1Su15XMMJ65QAi4F1ugNBaXUBiGbX6';
  const b = await api.derive.currencies.balance(account, { Token: 'ACA' })
  // const b = await api.query.tokens.accounts('5Dw5KnvTs96FaRQFez1Su15XMMJ65QAi4F1ugNBaXUBiGbX6', { ForeignAsset: 0 });
  console.log(b);

  process.exit(0);
})()
