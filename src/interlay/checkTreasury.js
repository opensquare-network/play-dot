const { getApi } = require("./api");

async function hasTreasury(height) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  return !!blockApi.query.treasury;
}

async function check() {
  let start = 2599101;
  let end = 4445293;

  await hasTreasury(end);

  while (start < end) {
    let middle = parseInt((start + end) / 2);
    let has = await hasTreasury(middle);
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
  await hasTreasury(2959905);
  // await check();
})();
