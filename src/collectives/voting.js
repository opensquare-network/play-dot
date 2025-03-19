const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://polkadot-collectives-rpc.polkadot.io/");
  const entries = await api.query.fellowshipCollective.voting.entries(33);

  console.log(entries);

  process.exit(0);
})();
