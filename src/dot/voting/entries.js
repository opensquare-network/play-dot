const { getCommonApi } = require("../../common/api");
const { findBlockHash } = require("../../common/blockHash");

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const blockHash = await findBlockHash(26401280, api);
  const blockApi = await api.at(blockHash);

  const entries = await blockApi.query.convictionVoting.votingFor.entries("13NCLd3foNpsv1huPDzvvfyKh37NEEkGFotZnP52CTR98YFJ");
  const votes = [];
  for (const [storageKey, votingOf] of entries) {
    if (!votingOf.isCasting) {
      continue;
    }

    const casting = votingOf.asCasting;
    const delegations = casting.delegations.toJSON();
    casting.votes.map(v => {
      const referendumIndex = v[0].toNumber();
    });
    for (const vote of casting.votes) {

    }

  }

  console.log(entries);
  process.exit(0);
})();
