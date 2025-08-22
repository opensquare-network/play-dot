const { getCommonApi } = require("../../common/api");

(async () => {
  const api = await getCommonApi("wss://polkadot-collectives-rpc.polkadot.io");
})()
