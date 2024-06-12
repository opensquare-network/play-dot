const BigNumber = require("bignumber.js");
const { getApi } = require("../api");

async function queryDelegations(api, height, address) {
  let blockApi = api;
  if (height) {
    const blockHash = await api.rpc.chain.getBlockHash(height);
    blockApi = await api.at(blockHash);
  }

  const rawVotingFor = await blockApi.query.convictionVoting.votingFor(address, 33);
  const delegations = rawVotingFor.asCasting.delegations.votes.toString() / Math.pow(10, 12);
  return delegations;
}

function gte6M(v) {
  return new BigNumber(v).gte(30000);
}

async function isDv(api, height, address) {
  const delegations = await queryDelegations(api, height, address);
  return gte6M(delegations);
}

;(async () => {
  const api = await getApi();

  const address = "J9FdcwiNLso4hcJFTeQvy7f7zszGhKoVh5hdBM2qF7joJQa";
  let start = 23000000, end = 23563984;

  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const yes = await isDv(api, middle, address);
    if (yes) {
      start = middle;
      console.log(`${ middle } is DV`);
    } else {
      end = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  process.exit(0);
})();
