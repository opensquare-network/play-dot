const { sortVotesWithConviction, LOCKS } = require("./sort");
const { extractStandardVote, extractSplitVote, extractSplitAbstainVote } = require("./normalizeVote");
const { normalizeVotingOfEntry } = require("./normalizeEntry");
const { getApi } = require("../../api");
const BigNumber = require("bignumber.js");

function extractCastingVotes(allVotes, referendumIndex) {
  return allVotes.filter(vote => {
    const { voting } = vote;
    return voting.isCasting;
  }).map(({ account, voting }) => {
    return {
      account,
      votes: voting.asCasting.votes.filter(([idx]) =>
        idx.eq(referendumIndex),
      ),
    };
  })
    .filter(({ votes }) => votes.length > 0)
    .map(({ account, votes }) => {
      return {
        account,
        vote: votes[0][1],
      };
    })
    .reduce((result, { account, vote }) => {
      if (vote.isStandard) {
        result.push(...extractStandardVote(account, vote));
      } else if (vote.isSplit) {
        result.push(...extractSplitVote(account, vote));
      } else if (vote.isSplitAbstain) {
        result.push(...extractSplitAbstainVote(account, vote));
      }

      return result;
    }, []);
}

function extractDelegations(allVotes, castingVotes) {
  const allDelegations = allVotes.filter(vote => {
    const { voting } = vote;
    return voting.isDelegating;
  });

  return allDelegations.reduce((result, delegation) => {
    const delegating = delegation.voting.asDelegating;
    const target = delegating.target.toString();
    const to = castingVotes.find(({ account, type }) => account === target && type === "Standard");

    if (!to) {
      return result;
    }

    return [
      ...result,
      {
        account: delegation.account,
        balance: delegating.balance.toBigInt().toString(),
        isDelegating: true,
        aye: to.aye,
        conviction: delegating.conviction.toNumber(),
      }
    ];
  }, []);
}

;(async () => {
  const api = await getApi();
  const referendumIndex = 138;
  // const height = 15426832;
  const height = 17373567;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const preBlockHash = await api.rpc.chain.getBlockHash(height - 1);
  const preBlockApi = await api.at(preBlockHash);
  const referendumInfo = await preBlockApi.query.referenda.referendumInfoFor(referendumIndex);
  const aye = referendumInfo.unwrap().asOngoing.tally.ayes.toBigInt().toString();
  const nay = referendumInfo.unwrap().asOngoing.tally.nays.toBigInt().toString()

  const blockApi = await api.at(blockHash);
  const voting = await blockApi.query.convictionVoting.votingFor.entries();
  const normalized = voting.map((item) => normalizeVotingOfEntry(item, blockApi));
  const bigSpenderTrackVotes = normalized.filter(item => item.trackId === 34);

  const castingVotes = extractCastingVotes(bigSpenderTrackVotes, referendumIndex);
  const delegations = extractDelegations(bigSpenderTrackVotes, castingVotes);

  const sorted = sortVotesWithConviction([...castingVotes, ...delegations]);

  const allAye = sorted.filter((v) => !v.isAbstain && v.aye);
  const allNay = sorted.filter((v) => !v.isAbstain && !v.aye);
  const allAbstain = sorted.filter((v) => v.isAbstain);
  // return { allAye, allNay, allAbstain };

  const ayeValue = allAye.reduce((result, item) => {
    const balance = new BigNumber(item.balance).multipliedBy(LOCKS[item.conviction])
      .div(10).toFixed(0, 1);

    return new BigNumber(result).plus(balance).toFixed();
  }, 0);
  const nayValue = allNay.reduce((result, item) => {
    const balance = new BigNumber(item.balance).multipliedBy(LOCKS[item.conviction])
      .div(10).toFixed(0, 1);

    return new BigNumber(result).plus(balance).toString();
  }, 0);

  console.log("aye", aye, "ayeValue", ayeValue);
  console.log("nay", nay, "nayValue", nayValue);

  if (aye === ayeValue) {
    console.log("Aye value match");
  }
  if (nay === nayValue) {
    console.log("Nay value match");
  }

  // const capital = sorted.reduce((result, item) => {
  //   return new BigNumber(result).plus(item.balance).toString();
  // }, 0)

  // console.log(normalized);
  process.exit(0);
})();
