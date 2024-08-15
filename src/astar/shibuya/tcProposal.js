const { getApi } = require("./api");
const { findBlockHash } = require("../../common/blockHash");

async function hasTcProposal(api, height) {
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  if (!blockApi.query?.technicalCommittee) {
    return false;
  }

  const proposals = await blockApi.query.technicalCommittee.proposals();
  return proposals.length > 0;
}

;(async () => {
  const api = await getApi();
  let start = 2250385, end = 6914262;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const yes = await hasTcProposal(api, middle);
    if (yes) {
      start = middle;
      console.log(`${ middle } has TC proposals`);
    } else {
      end = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  process.exit(0);
})();
