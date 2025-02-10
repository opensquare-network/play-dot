const { getCommonApi } = require("../common/api");
(async () => {
  // const api = await getCommonApi("wss://sys.ibp.network/people-polkadot");
  // const api = await getCommonApi("wss://polkadot-people-rpc.polkadot.io/");
  const api = await getCommonApi("wss://sys.ibp.network/people-polkadot");
  // const metadata = await api.rpc.state.getMetadata();
  const entries = await api.query.identity.usernameAuthorities.entries();
  for (const [storageKey, optionalStorage] of entries) {
    const who = storageKey.args[0].toString();
    if (!optionalStorage.isSome) {
      return;
    }

    const storage = optionalStorage.unwrap();
    const suffix = storage.suffix.toHuman();
    const allocation = storage.allocation.toString();
    console.log(who, suffix, allocation);
  }

  process.exit(0);
})();
