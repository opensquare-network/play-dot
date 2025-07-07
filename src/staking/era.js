const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
})();
