const { extractAddressAndTrackId } = require("../../../gov2/convictionVoting/storage/votingFor/key");

function normalizeVotingOfEntry([storageKey, voting], blockApi) {
  const { address, trackId } = extractAddressAndTrackId(storageKey, blockApi);
  return { account: address, trackId, voting };
}

module.exports = {
  normalizeVotingOfEntry,
}
