const { getApi } = require("./interlay-api");

async function hasTreasury(height) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  return !!blockApi.query.treasury;
}

(async () => {
  let start = 2959904;
  let end = 2959905;

  await hasTreasury(end);

  while (start < end - 1) {
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
})();
