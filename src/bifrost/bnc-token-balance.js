const { getBncApi } = require("./api");

;(async () => {
  const api = await getBncApi();

  const account = 'CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp';
  const rmrkBalance = await api.query.tokens.accounts(account, { Token: 'RMRK' });
  console.log(rmrkBalance.toJSON());

  // api.query.tokens.accounts('5Dw5KnvTs96FaRQFez1Su15XMMJ65QAi4F1ugNBaXUBiGbX6', { Token: 'ACA' })
  //   .then(r => {
  //     console.log(r)
  //     const aa = r.toHuman();
  //     console.log(JSON.stringify(aa))
  //   })

  process.exit(0);
})()
