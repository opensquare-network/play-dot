const BigNumber = require("bignumber.js");
const { getApi } = require("../api");

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
  return new BigNumber(v).gte(6200000);
}

async function isDv(api, height, address) {
  const delegations = await queryDelegations(api, height, address);
  return {
    delegations,
    isDv: gte6M(delegations),
  }
}

;(async () => {
  const api = await getApi();
  const address = "13EyMuuDHwtq5RD6w3psCJ9WvJFZzDDion6Fd2FVAqxz1g7K";
  let start = 22703699, end = 22903699;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const { delegations, isDv: yes } = await isDv(api, middle, address);
    if (yes) {
      start = middle;
    } else {
      end = middle;
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
