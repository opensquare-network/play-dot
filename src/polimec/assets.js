const { getCommonApi } = require("../common/api");
const { findBlockApiByHeight } = require("../common/blockHash");

async function isNumber(api, height) {
  const blockApi = await findBlockApiByHeight(height, api);
  const entries = await blockApi.query.foreignAssets.asset.entries();
  if (entries.length <= 0) {
    return false;
  }

  const [storageKey] = entries[0];
  return !isNaN(storageKey.args[0].toJSON());
}

(async () => {
  const api = await getCommonApi("wss://polimec.rpc.amforc.com/");
  let start = 3295410, end = 3338280;

  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const yes = await isNumber(api, middle);
    if (yes) {
      start = middle;
    } else {
      end = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  process.exit(0);
})();
