const { getKarApi } = require("./api");

;(async () => {
  const api = await getKarApi();

  const account = '5Dw5KnvTs96FaRQFez1Su15XMMJ65QAi4F1ugNBaXUBiGbX6';
  const karFree = await api.derive.currencies.balance(account, { Token: 'KAR' })
  console.log('karFree', karFree.toString());
  const rmrkBalance = await api.query.tokens.accounts('5Dw5KnvTs96FaRQFez1Su15XMMJ65QAi4F1ugNBaXUBiGbX6', { ForeignAsset: 0 });
  console.log(rmrkBalance.toJSON());

  api.query.tokens.accounts('5Dw5KnvTs96FaRQFez1Su15XMMJ65QAi4F1ugNBaXUBiGbX6', { Token: 'ACA' })
    .then(r => {
      console.log(r)
      // const aa = r.toHuman();
      // console.log(JSON.stringify(aa))
    })

  process.exit(0);
})()
