const { findBlockHash } = require("../../common/blockHash");
const { getApi } = require("./api");

async function hasTc(api, height) {
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  return blockApi.query?.technicalCommittee;
}

async function hasDemocracy(api, height) {
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  return blockApi.query?.democracy;
}

async function check(api) {
  let start = 6262114, end = 6914262;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const yes = await hasTc(api, middle);
    if (yes) {
      end = middle;
      console.log(`${ middle } has TC`);
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }
}

;(async () => {
  const api = await getApi();
  // await check(api);

  const has1 = await hasDemocracy(api, 6734291);
  console.log(`6734291 ${has1 ? "has" : "no"}`);
  const has2 = await hasDemocracy(api, 6734290);
  console.log(`6734290 ${has2 ? "has" : "no"}`);

  process.exit(0);
})();
