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

function gte30k(v) {
  return new BigNumber(v).gte(5000);
}

async function isDv(api, height, address) {
  const delegations = await queryDelegations(api, height, address);
  return {
    delegations,
    isDv: gte30k(delegations),
  }
}

;(async () => {
  const api = await getApi();

  const address = "EyPcJsHXv86Snch8GokZLZyrucug3gK1RAghBD2HxvL1YRZ";
  let start = 29900000, end = 29940500;

  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const { delegations, isDv: yes } = await isDv(api, middle, address);
    if (yes) {
      end = middle;
      console.log(`${ middle } is DV`);
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
    if (start >= end - 1) {
      console.log(`delegations at ${middle}:`, delegations);
      const delegations2 = await queryDelegations(api, middle + 1, address);
      console.log(`delegations at ${middle + 1}:`, delegations2);

      const delegations3 = await queryDelegations(api, middle - 1, address);
      console.log(`delegations at ${middle - 1}:`, delegations3);
    }
  }

  process.exit(0);
})();
