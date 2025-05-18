const { getCommonApi } = require("../../common/api");
const { findBlockApiByHeight } = require("../../common/blockHash");

async function hasForeignAssets(api, height) {
  const blockApi = await findBlockApiByHeight(height, api);
  return !!blockApi.query.foreignAssets;
}

(async () => {
  const api = await getCommonApi("wss://polkadot-asset-hub-rpc.polkadot.io/");
  let start = 1, end = 8459328;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2 + "");
    const yes = await hasForeignAssets(api, middle);
    if (yes) {
      end = middle;
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  process.exit(0);
})();
