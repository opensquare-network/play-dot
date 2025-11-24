const { getCommonApi } = require("../common/api");
(async () => {
  const api = await getCommonApi("wss://polkadot-collectives-rpc.polkadot.io/");
  const entries = await api.query.fellowshipReferenda.referendumInfoFor.entries();
  console.log(entries);
  process.exit(0);
})();
