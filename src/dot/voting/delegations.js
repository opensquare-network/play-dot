const { getCommonApi } = require("../../common/api");
const { findBlockHash } = require("../../common/blockHash");
(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const blockHash = await findBlockHash(26426764, api);
  const blockApi = await api.at(blockHash);

  const entries = await blockApi.query.convictionVoting.votingFor.entries("14MxmPqw3AcNzmTZVmXFMWsh4FdLRcr7jqdRNKrXgAat47UT");
  for (const [storageKey, votingOf] of entries) {
    const who = storageKey.args[0].toString();
    const trackId = storageKey.args[1].toNumber();
    if (!votingOf.isDelegating) {
      continue;
    }

    const delegating = votingOf.asDelegating;
    const balance = delegating.balance.toString();
    const target = delegating.target.toString();
    const conviction = delegating.conviction.toNumber();
    console.log({
      who,
      target,
      trackId,
      balance,
      conviction,
    });
  }

  process.exit(0);
})();
