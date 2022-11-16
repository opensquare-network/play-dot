const { getApi } = require("../../../api");
const { extractAddressAndTrackId } = require("./key");
const { extractAllCasting } = require("./casting");

;(async () => {
  const api = await getApi();
  const entries = await api.query.convictionVoting.votingFor.entries();
  const castingVotes = extractAllCasting(entries, api);
  console.log(castingVotes);
  for (const [storageKey, votingOf] of entries) {
    const { address, trackId } = extractAddressAndTrackId(storageKey, api);
  }

  process.exit(0)
})();
