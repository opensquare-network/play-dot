const {getApi} = require("./api");

const rfisSymbol = 0;
const fisAddress = "36NQ98C5uri7ruBKvdzWFeEJQEhGpzCvJVbMHkbTu2mCgMRo";

(async () => {
  try {
    const api = await getApi();
    const entries = await api.query.rBalances.account.entries();

    const accountData = await api.query.rBalances.account(
      rfisSymbol,
      fisAddress
    );
    const data = accountData.toJSON();
    const amount = data ? data.free + "" : "0";
    console.error(amount);
  } catch (err) {
    console.error(err);
  }
})()
