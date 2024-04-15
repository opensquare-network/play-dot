const { getApi } = require("../api");
const BigNumber = require("bignumber.js");

async function queryDelegations(api, height, address) {
  let blockApi = api;
  if (height) {
    const blockHash = await api.rpc.chain.getBlockHash(height);
    blockApi = await api.at(blockHash);
  }

  const rawVotingFor = await blockApi.query.convictionVoting.votingFor(address, 33);
  const delegations = rawVotingFor.asCasting.delegations.votes.toString() / Math.pow(10, 10);
  return delegations;
}

function gte6M(v) {
  return new BigNumber(v).gte(6000000);
}

async function isDv(api, height, address) {
  const delegations = await queryDelegations(api, height, address);
  return gte6M(delegations);
}

;(async () => {
  const api = await getApi();
  const address = "1ZSPR3zNg5Po3obkhXTPR95DepNBzBZ3CyomHXGHK9Uvx6w";
  let start = 17538999, end = 20292579;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const yes = await isDv(api, middle, address);
    if (yes) {
      end = middle;
      console.log(`${ middle } is DV`);
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }
  process.exit(0)
})();
