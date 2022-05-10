const { getApi } = require("./api");
const BigNumber = require("bignumber.js")

;(async () => {
  const api = await getApi();
  const account = await api.query.system.account("ESgz7GLVW7BL5DhRgpVnxSXVwaKt4ytWcrf52TY1GQD1cEb");
  const total = new BigNumber(account.data.free.toString()).plus(account.data.reserved.toString()).toString();
  console.log(total);
  process.exit(0);
})()
