const { extractAllDelegations } = require("./delegating");
const { getApi } = require("../../../api");
const { extractAllCasting } = require("./casting");

;(async () => {
  const api = await getApi();
  const entries = await api.query.convictionVoting.votingFor.entries();
  const castingVotes = extractAllCasting(entries, api);
  const allDelegations = extractAllDelegations(entries, api);
  console.log(allDelegations);

  process.exit(0)
})();
