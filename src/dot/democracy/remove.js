const { getApi } = require("../api");
const { findBlockApiByHeight } = require("../../common/blockHash");

async function hasDemocracyPallet(height) {
  const api = await getApi();
  const blockApi = await findBlockApiByHeight(height, api);
  return !!blockApi.query.democracy;
}

async function hasTipsPallet(height) {
  const api = await getApi();
  const blockApi = await findBlockApiByHeight(height, api);
  return !!blockApi.query.tips;
}


;(async () => {
  let start = 18144000;
  let end = 18692867;

  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const has = await hasTipsPallet(middle);
    if (has) {
      start = middle;
    } else {
      end = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

})();
