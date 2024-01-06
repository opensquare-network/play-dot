const { getApi } = require("../api");

async function hasRequestStatusFor(height) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  return !!blockApi.query.preimage.requestStatusFor;
}

;(async () => {
  const api = await getApi();
  // const height = 	7514965;
  // const blockHash = await api.rpc.chain.getBlockHash(height);
  // const blockApi = await api.at(blockHash);

  let start = 1;
  let end = 5999865;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    let has = await hasRequestStatusFor(middle);
    if (has) {
      end = middle;
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  console.log("start", start, "end", end);
  process.exit(0);
})()
