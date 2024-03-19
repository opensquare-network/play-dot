const { getApi } = require("./api");

async function hasTips(height) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  return !!blockApi.query.tips;
}

async function check() {
  let start = 1;
  let end = 2219477;

  await hasTips(end);

  while (start < end) {
    let middle = parseInt((start + end) / 2);
    let has = await hasTips(middle);
    if (has) {
      start = middle;
    } else {
      end = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  console.log("start", start, "end", end);
}

(async () => {
  await hasTips(1498215);
})();
