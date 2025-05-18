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

async function binarySearch() {
  const api = await getApi();
  const address = "12pXignPnq8sZvPtEsC3RdhDLAscqzFQz97pX2tpiNp3xLqo";
  let start = 23364976, end = 25571285;
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
}

async function queryAddrDelegations() {
  const api = await getApi();
  const address = "14ZaBmSkr6JWf4fUDHbApqHBvbeeAEBSAARxgzXHcSruLELJ";
  const height = 25571285;

  const delegations = await queryDelegations(api, height, address);
  console.log("delegations", delegations);
}

;(async () => {
  await binarySearch();
  // await queryAddrDelegations();
  process.exit(0)
})();
