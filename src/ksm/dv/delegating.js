const { getApi } = require("../api");
const BigNumber = require("bignumber.js");

async function queryDelegating(api, height, address) {
  let blockApi = api;
  if (height) {
    const blockHash = await api.rpc.chain.getBlockHash(height);
    blockApi = await api.at(blockHash);
  }

  const rawVotingFor = await blockApi.query.convictionVoting.votingFor(address, 33);
  const delegating = rawVotingFor.asDelegating;
  const capital = delegating.balance.toString();
  const conviction = delegating.conviction.toNumber();
  const delegations = new BigNumber(capital).times(conviction).div(Math.pow(10, 12)).toString();

  const target = rawVotingFor.asDelegating.target.toString();
  return {
    delegations, target,
  }
}

async function queryHistoryDelegating(api) {
  const address = "G1rrUNQSk7CjjEmLSGcpNu72tVtyzbWdUvgmSer9eBitXWf";
  const height = 27921176;
  const { delegations, target } = await queryDelegating(api, height, address);
  console.log(delegations, target);
}

(async () => {
  const api = await getApi();
  await queryHistoryDelegating(api);

  process.exit(0);
})();
