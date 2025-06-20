const { findBlockApiByHeight } = require("../common/blockHash");
const { getCommonApi } = require("../common/api");

async function isNewEnd(api, height) {
  const blockApi = await findBlockApiByHeight(height, api);
  const raw = await blockApi.query.democracy.referendumInfoOf(25);
  const info = raw.unwrap();
  if (!info.isOngoing) {
    return false;
  }
  const ongoing = info.asOngoing;
  return ongoing.end.toNumber() === 9071651;
}

async function find(api) {
  let start = 8971200, end = 9011120;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2 + "");
    const yes = await isNewEnd(api, middle);
    if (yes) {
      end = middle;
    } else {
      start = middle;
    }
    console.log("start", start, "end", end, "middle", middle);
  }
}

(async () => {
  const api = await getCommonApi("wss://rpc.astar.network");
  // await find(api);
  const height = 8971658;
  const isNew = await isNewEnd(api, height);
  console.log(`${height}: ${isNew}`);
  process.exit(0);
})();
