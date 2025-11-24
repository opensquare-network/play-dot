const { getCommonApi } = require("../../common/api");

async function hasEvidence(api, height) {
  const addr = "14uA7Vc828e2Q6oL5GBHP9UzTkEvwqbroERwRmucGrLmPuuL";
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  const raw = await blockApi.query.fellowshipCore?.memberEvidence(addr);
  return raw.isSome;
}

async function binary(api) {
  let start = 7157466;
  let end = 7621597;

  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    let has = await hasEvidence(api, middle);
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
  const api = await getCommonApi("wss://polkadot-collectives-rpc.polkadot.io");
  await binary(api);
  // const has = await hasEvidence(api, 7621597);
  // console.log("has", has);
  process.exit(0);
})()
