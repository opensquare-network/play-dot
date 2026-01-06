const { getCommonApi } = require("../../common/api");
const { findBlockApiByHeight } = require("../../common/blockHash");

async function isReferendum1767Cancelled(api, blockHeight) {
  const blockApi = await findBlockApiByHeight(blockHeight, api);
  const raw = await blockApi.query.referenda.referendumInfoFor(1767);
  return raw.unwrap().isCancelled;
}

async function hasReferendum1767(api, blockHeight) {
  const blockApi = await findBlockApiByHeight(blockHeight, api);
  const raw = await blockApi.query.referenda.referendumInfoFor(1767);
  return raw.isSome;
}

async function findWhenHas(api) {
  let start = 10254500, end = 11113347;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2 + "");
    const yes = await hasReferendum1767(api, middle);
    if (yes) {
      end = middle;
    } else {
      start = middle;
    }
    console.log("start", start, "end", end, "middle", middle);
  }
}

(async () => {
  const api = await getCommonApi("wss://polkadot-asset-hub-rpc.polkadot.io");
  // await findWhenHas(api);
  await isReferendum1767Cancelled(api, 10258185);

  process.exit(0);
})();
