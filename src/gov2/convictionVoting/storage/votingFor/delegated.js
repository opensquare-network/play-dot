const { normalizeDelegating } = require("./delegating");
const { extractAddressAndTrackId } = require("./key");
const { getApi } = require("../../../api");

const trackId = 1;
const address = "5GnNHt39B9te5yvhv5qF494u6FF24Ld6MxEGFP4UanGJyag8";

;(async () => {
  const api = await getApi();

  const entries = await api.query.convictionVoting.votingFor.entries();
  const delegatingEntries = entries.filter(([, votingOf]) => votingOf.isDelegating);

  const normalized = [];
  for (const [storageKey, votingOf] of delegatingEntries) {
    const { address, trackId } = extractAddressAndTrackId(storageKey, api);
    const delegating = normalizeDelegating(votingOf);
    normalized.push({
      address,
      trackId,
      ...delegating,
    })
  }

  const inTrack = normalized.filter(item => item.trackId === trackId);
  const directDelegating = inTrack.filter(item => item.target === address);

  const directAddresses = directDelegating.map(item => item.address);
  const nested = inTrack.filter(item => directAddresses.includes(item.target));

  console.log('delegatingEntries', directDelegating, "nested", nested);
  process.exit(0);
})();
