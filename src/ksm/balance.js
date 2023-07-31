const { getApi } = require("./api");
const BigNumber = require("bignumber.js")
const { findBlockApiByHeight } = require("../common/blockHash");

async function getBalance(account, height) {
  const api = await getApi();
  const blockApi = await findBlockApiByHeight(height, api);
  if (blockApi.query.system?.account) {
    const accountInfo = await blockApi.query.system.account(account);
    return accountInfo.data.free.toString();
  }

  if (blockApi.query.balances.freeBalance) {
    const rawBalance = await blockApi.query.balances.freeBalance(account);
    if (rawBalance) {
      return rawBalance.toString()
    }
  }

  return null;
}


;(async () => {
  const account = "FcxNWVy5RESDsErjwyZmPCW6Z8Y3fbfLzmou34YZTrbcraL";
  const balance1 = await getBalance(account, 310098);
  const balance2 = await getBalance(account, 310099);
  const balance3 = await getBalance(account, 310100);
  console.log(balance1, balance2, balance3);
  // const api = await getApi();
  // const account = await api.query.system.account("ESgz7GLVW7BL5DhRgpVnxSXVwaKt4ytWcrf52TY1GQD1cEb");
  // const total = new BigNumber(account.data.free.toString()).plus(account.data.reserved.toString()).toString();
  // console.log(total);
  process.exit(0);
})()
