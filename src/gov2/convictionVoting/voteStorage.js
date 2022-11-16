const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const entries = await api.query.convictionVoting.votingFor.entries();
  for (const [storageKey] of entries) {
    console.log(storageKey.toString());
  }

  process.exit(0)
})();
