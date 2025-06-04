const { getCommonApi } = require("../../common/api");
const { findBlockHash } = require("../../common/blockHash");

async function hasBounty(api, height) {
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  const optionalValue = await blockApi.query.childBounties.childBounties(24, 9);
  return optionalValue.isSome;
}

async function binaryFindOut(api) {
  let start = 25000000, end = 26203421;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2 + "");
    const yes = await hasBounty(api, middle);
    if (yes) {
      end = middle;
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }
}

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  // await hasBounty(api, 26203421);
  await binaryFindOut(api);
  process.exit(0);
})();
