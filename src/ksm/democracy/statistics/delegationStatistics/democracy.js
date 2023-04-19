const { calcVotes } = require("../sort");
const { normalizeVotingOfEntry } = require("../normalizeEntry");
const { getApi } = require("../../../api.js");

const beenDelegatedCntMap = {};

function incBeenDelegated(delegatee) {
  const cnt = beenDelegatedCntMap[delegatee];
  if (cnt) {
    beenDelegatedCntMap[delegatee] = cnt + 1;
  } else {
    beenDelegatedCntMap[delegatee] = 1;
  }
}

(async () => {
  const api = await getApi();
  const height = 17547156;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  const voting = await blockApi.query.democracy.votingOf.entries();
  const normalized = voting.map((item) => normalizeVotingOfEntry(item, blockApi));
  const allDelegations = normalized.filter(vote => {
    const { voting } = vote;
    return voting.isDelegating;
  });

  for (const delegation of allDelegations) {
    const { voting } = delegation;
    incBeenDelegated(voting.asDelegating.target.toString());
  }

  const delegations = allDelegations.map(delegation => {
    const { account, voting } = delegation;
    const delegating = voting.asDelegating;
    const target = delegating.target.toString();
    const balance = delegating.balance.toBigInt().toString()
    const conviction = delegating.conviction.toNumber();
    const votes = calcVotes(balance, conviction);

    const delegatedVotes = delegating.delegations.votes.toBigInt().toString();
    const delegatedCapital = delegating.delegations.capital.toBigInt().toString();
    const delegatorsCount = beenDelegatedCntMap[account] || 0;
    // todo: convert balance value type to decimal128 if we need to insert into mongodb.
    return {
      account,
      target,
      balance,
      conviction,
      votes,
      beenDelegated: {
        count: delegatorsCount,
        capital: delegatedCapital,
        votes: delegatedVotes,
      }
    }
  });

  console.log(delegations);
  process.exit(0);
})();
