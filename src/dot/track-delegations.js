const { getApi } = require("./api");

async function getTracksDelegations(api, addr) {
  const entries = await api.query.convictionVoting.votingFor.entries(addr);
  const result = entries.reduce((result, [storageKey, votingFor]) => {
    if (!votingFor.isCasting) {
      return result;
    }

    const trackId = storageKey.args[1].toNumber();
    const casting = votingFor.asCasting;
    const delegationVotes = casting.delegations.votes.toString();
    return [...result, { trackId, delegationVotes }];
  }, []);

  return result;
}

(async () => {
  const api = await getApi();
  await getTracksDelegations(api, "13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M")
  process.exit(0);
})();
