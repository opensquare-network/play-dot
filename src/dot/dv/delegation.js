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

function gte2M(v) {
  return new BigNumber(v).gte(2000000);
}

function gte200K(v) {
  return new BigNumber(v).gte(200000);
}

async function isDv(api, height, address) {
  const delegations = await queryDelegations(api, height, address);
  return gte200K(delegations);
}

async function binarySearch() {
  const api = await getApi();
  const address = "15oLanodWWweiZJSoDTEBtrX7oGfq6e8ct5y5E6fVRDPhUgj";
  let start = 27578500, end = 27580020;
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
