const { getApi } = require("./api");
const { findBlockApiByHeight } = require("../common/blockHash");
const BigNumber = require("bignumber.js");

async function queryBalance() {
  const blockApi = await findBlockApiByHeight(start, api);

  const account = "16ZL8yLyXv3V3L3z9ofR1ovFLziyXaN1DPq4yffMAZ9czzBD";
  const assetId = 30;
  const accountData = await blockApi.query.assets.account(assetId, account);
  if (accountData.isSome) {
    return accountData.unwrap().balance.toString();
  } else {
    return null;
  }
}

function recurHeight() {
  let start = 592720;
  let end = 5928000;

}


;(async () => {
  const api = await getApi();
  const start = 5927333;
  const height = 5981526;
  const blockApi = await findBlockApiByHeight(start, api);

  const account = "16ZL8yLyXv3V3L3z9ofR1ovFLziyXaN1DPq4yffMAZ9czzBD";
  const assetId = 30;
  const accountData = await blockApi.query.assets.account(assetId, account);

  if (accountData.isSome) {
    console.log(accountData.unwrap().balance.toString())
  } else {
    console.log(`no data`);
  }
  process.exit(0);
})();
