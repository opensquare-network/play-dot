const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const header = await api.rpc.chain.getHeader();

  console.log(header);
  process.exit(0);
})();
