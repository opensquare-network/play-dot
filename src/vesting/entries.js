const { getCommonApi } = require("../common/api");

(async () => {
  // const api = await getCommonApi("wss://sys.turboflakes.io/asset-hub-paseo");
  const api = await getCommonApi("wss://polkadot-asset-hub-rpc.polkadot.io");
  const entries = await api?.query?.vesting?.vesting.entries();
  const objMap = {};
  for (const [storageKey, optionalStorage] of entries) {
    const who = storageKey.args[0].toString();
    objMap[who] = optionalStorage.unwrap().length;
  }

  process.exit(0);
})();
