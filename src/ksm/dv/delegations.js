const { getApi } = require("../api");
const BigNumber = require("bignumber.js");

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

async function findPoint() {
  const api = await getApi();
  const address = "FcjmeNzPk3vgdENm1rHeiMCxFK96beUoi2kb59FmCoZtkGF";
  let start = 22045000, end = 22688303;
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

async function query() {
  const api = await getApi();
  const address = "GqC37KSFFeGAoL7YxSeP1YDwr85WJvLmDDQiSaprTDAm8Jj";
  const height = 22653264;
  const delegations = await queryDelegations(api, height, address);
  console.log(delegations);
}

;(async () => {
  // await query();
  await findPoint();
  process.exit(0)
})();
