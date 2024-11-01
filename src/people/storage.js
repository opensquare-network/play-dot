const { getCommonApi } = require("../common/api");
(async () => {
  // const api = await getCommonApi("wss://sys.ibp.network/people-polkadot");
  // const api = await getCommonApi("wss://polkadot-people-rpc.polkadot.io/");
  const api = await getCommonApi("wss://rpc-people-polkadot.luckyfriday.io/");
  // await api.query

  process.exit(0);
})();
