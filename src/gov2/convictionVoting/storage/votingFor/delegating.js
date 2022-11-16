const { extractAddressAndTrackId } = require("./key");

function normalizeDelegating(votingOf) {
  if (!votingOf.isDelegating) {
    return
  }

  const delegating = votingOf.asDelegating;
  return {
    balance: delegating.balance.toString(),
    target: delegating.target.toString(),
    conviction: delegating.conviction.toNumber(),
  }
}

function extractAllDelegations(entries = [], api) {
  const delegatingEntries = entries.filter(([, votingOf]) => votingOf.isDelegating);
  const delegations = [];
  for (const [storageKey, votingOf] of delegatingEntries) {
    const { address, trackId } = extractAddressAndTrackId(storageKey, api);
    const normalized = normalizeDelegating(votingOf);
    if (normalized) {
      delegations.push({ address, trackId, ...normalized });
    }
  }

  return delegations;
}

module.exports = {
  extractAllDelegations,
}
