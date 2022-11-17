const { extractAllCasting } = require("./casting");
const { extractAddressAndTrackId } = require("../votingFor/key");
const { getApi } = require("../../../api");

;(async () => {
  const api = await getApi();
  const entries = await api.query.convictionVoting.votingFor.entries();

  const targetTrackId = 33;
  const targetReferendumIndex = 2;
  // 1. get all the track 33's entries
  const trackEntries = entries.filter(([storageKey]) => {
    const { trackId } = extractAddressAndTrackId(storageKey, api);
    return trackId === targetTrackId;
  });

  // 2. get all direct votes to referendum #2
  const allDirectVotes = extractAllCasting(entries, targetReferendumIndex, api);

  console.log(trackEntries);
})();
