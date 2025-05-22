const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const metadata = await api.rpc.state.getMetadata();

  console.log(metadata);
})();
