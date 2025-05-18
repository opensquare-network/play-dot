const { getCommonApi } = require("../../common/api");

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const entries = await api.query.referenda.referendumInfoFor.entries();
  for (const [storageKey, optionalStorage] of entries) {
    const referendumIndex = storageKey.args[0].toNumber();
    const unwrapped = optionalStorage.unwrap();
    if (unwrapped.isOngoing) {

    }
    console.log(optionalStorage);
  }
  process.exit(0);
})();
