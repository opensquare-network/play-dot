const { getCommonApi } = require("../../common/api");
const { findBlockApiByHeight } = require("../../common/blockHash");
const { getApi } = require("../../dot/api");

async function hasMultisigPallet(api, height) {
  const blockApi = await findBlockApiByHeight(height, api);
  return !!blockApi.query.multisig;
}

async function find(api) {
  let start = 0, end = 600000;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2 + "");
    const yes = await hasMultisigPallet(api, middle);
    if (yes) {
      end = middle;
    } else {
      start = middle;
    }
    console.log("start", start, "end", end, "middle", middle);
  }
}

async function check(api, height) {
  const yes = await hasMultisigPallet(api, height);
  console.log(`${height} has identity`, yes);
}

(async () => {
  const api = await getCommonApi("wss://kusama-asset-hub-rpc.polkadot.io/");
  // await find(api);
  await check(api, 66687);
  process.exit(0);
})();
