const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://westend-asset-hub-rpc.polkadot.io");
  const entries = await api?.query?.recovery?.friendGroups.entries();
  for (const [storageKey, optionalStorage] of entries) {
    const lost = storageKey.args[0].toString();
  }
  console.log(entries);
})();
