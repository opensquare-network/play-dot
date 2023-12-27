const { findBlockApiByHeight } = require("../../common/blockHash");
const { getApi } = require("../api");

async function hasDemocracyPallet(height) {
  const api = await getApi();
  const blockApi = await findBlockApiByHeight(height, api);
  return !!blockApi.query.democracy;
}

;(async () => {
  let start = 7528511;
  let end = 8418686;

  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const has = await hasDemocracyPallet(middle);
    if (has) {
      start = middle;
    } else {
      end = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }
})();
