const { getApi } = require("../api");
const { findBlockApiByHeight } = require("../../common/blockHash");
const BigNumber = require("bignumber.js");

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

  return 0;
}

const account = "F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29";
const checkValue = 300000 * Math.pow(10, 12);

(async () => {

  let start = 18700000;
  let end = 18741580;

  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const b = await getBalance(account, middle);
    if (new BigNumber(b).gt(checkValue)) {
      end = middle;
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

})();
