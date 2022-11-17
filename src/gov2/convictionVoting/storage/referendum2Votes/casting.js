const { extractAddressAndTrackId } = require("../votingFor/key");

function extractAllCasting(entries = [], referendumIndex, api) {
  const castingEntries = entries.filter(([, votingOf]) => votingOf.isCasting);

  return castingEntries.reduce((result, [storageKey, votingOf]) => {
    const { address } = extractAddressAndTrackId(storageKey, api);
    const votes = votingOf.asCasting.votes
      .filter(([pollIndex, vote]) => pollIndex.toNumber() === referendumIndex && vote.isStandard)
      .map(([, vote]) => {
        const standard = vote.asStandard;
        const balance = standard.balance.toString();
        const aye = standard.vote.isAye;
        const conviction = standard.vote.conviction.toNumber();

        return {
          address,
          isDelegating: false,
          balance,
          aye,
          conviction,
        }
      })

    return [...result, ...votes];
  }, []);
}

module.exports = {
  extractAllCasting,
}
