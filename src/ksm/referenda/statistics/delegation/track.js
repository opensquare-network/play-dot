const { calcVotes } = require("../../../democracy/statistics/sort");
const { normalizeVotingOfEntry } = require("../normalizeEntry");
const { getApi } = require("../../../api");

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
  const voting = await api.query.convictionVoting.votingFor.entries();
  const normalized = voting.map((item) => normalizeVotingOfEntry(item, api));
  const bigSpenderTrackVotes = normalized.filter(item => item.trackId === 34);

  const delegatingVotes = bigSpenderTrackVotes.filter(({ voting }) => voting.isDelegating);
  for (const delegation of delegatingVotes) {
    const { voting } = delegation;
    incBeenDelegated(voting.asDelegating.target.toString());
  }

  const delegations = delegatingVotes.map(delegation => {
    const { account, trackId, voting } = delegation;
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
      trackId,
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
  })


  console.log(delegations);
  process.exit(0);
})();
