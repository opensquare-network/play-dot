const { extractAddressAndTrackId } = require("./key");

function extractAccountVote(vote) {
  if (!vote.isStandard) {
    return
  }

  const standard = vote.asStandard;
  const balance = standard.balance.toString();
  const aye = standard.vote.isAye;
  const conviction = standard.vote.conviction.toNumber();
  if (conviction === undefined) {
    console.log(conviction);
  }

  return {
    isStandard: vote.isStandard,
    balance,
    aye,
    conviction,
  }
}

function extractCasting(votingOf) {
  if (!votingOf.isCasting) {
    return [];
  }

  const casting = votingOf.asCasting;
  // fixme: we are ignoring split vote
  const standardVotes = casting.votes.filter(([, accountVote]) => accountVote.isStandard);
  return standardVotes.map(([pollIndex, accountVote]) => {
    const normalizedVote = extractAccountVote(accountVote);
    return {
      pollIndex: pollIndex.toNumber(),
      ...normalizedVote,
    }
  });
}

function extractAllCasting(entries = [], api) {
  const castingEntries = entries.filter(([, votingOf]) => votingOf.isCasting);
  const castingVotes = [];
  for (const [storageKey, votingOf] of castingEntries) {
    const { address, trackId } = extractAddressAndTrackId(storageKey, api);
    const votes = extractCasting(votingOf);
    castingVotes.push(...votes.map(v => ({ address, trackId, ...v })));
  }

  return castingVotes;
}

module.exports = {
  extractAllCasting,
}
