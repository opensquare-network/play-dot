const { findBlockHash } = require("../../common/blockHash");
const { getCommonApi } = require("../../common/api");

async function hasRewardedEvent(api, height) {
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  return !!blockApi.events.staking.Rewarded;
}

async function find(api) {
  // let start = 6713103, end = 26714803; // for polkadot
  let start = 30819, end = 29069111;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2 + "");
    const yes = await hasRewardedEvent(api, middle);
    if (yes) {
      end = middle;
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }
}

async function check(api) {
  const blockHeight = 6713250;
  console.log(await hasRewardedEvent(api, blockHeight));
}

(async () => {
  // const api = await getCommonApi("wss://rpc.polkadot.io");
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  // await hasRewardedEvent(api, 26714803);
  // await find(api);
  await check(api);

  process.exit(0);
})();
