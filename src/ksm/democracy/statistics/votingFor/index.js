const { getApi } = require("../../../api");
const BigNumber = require("bignumber.js");
const { calcVotes } = require("../sort");

function bigAdd(v1, v2) {
  return new BigNumber(v1).plus(v2).toString();
}

async function getBalance(blockHash, blockApi, account) {
  if (blockApi.query.system?.account) {
    const accountInfo = await blockApi.query.system.account(account);
    return accountInfo.data.free.toString();
  }

  if (blockApi.query.balances.freeBalance) {
    const rawBalance = await blockApi.query.balances.freeBalance(account);
    if (rawBalance) {
      return rawBalance.toString();
    }
  }

  return 0;
}

;(async () => {
  const referendumIndex = 0;
  const api = await getApi();

  // const height = 56181;
  const height = 56180;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await api.at(blockHash);
  const votersFor = await blockApi.query.democracy.votersFor(referendumIndex);
  let votes = [];
  if (votersFor.length > 0) {
    votes = await blockApi.query.democracy.voteOf.multi(
      votersFor.map((addr) => [referendumIndex, addr]),
    );
  }

  const balancePromises = [];
  for (const voter of votersFor) {
    balancePromises.push(await getBalance(blockHash, blockApi, voter));
  }
  const balances = await Promise.all(balancePromises);

  const normalizedVotes = votersFor.map((voter, index) => {
    const vote = votes[index] || blockApi.registry.createType("Vote");
    const conviction = vote.conviction.toNumber();
    const balance = balances[index] || 0;
    return {
      account: voter.toString(),
      isDelegating: false,
      aye: vote.isAye,
      conviction,
      balance,
      vote: calcVotes(balance, conviction),
    };
  });

  let sum = 0;
  for (const { vote } of normalizedVotes) {
    sum = bigAdd(sum, vote);
  }
  console.log("sum", sum.toString());

  console.log("normalizedVotes", normalizedVotes);
})()
