const { getCommonApi } = require("../../common/api");

(async () => {
  const api = await getCommonApi("wss://polkadot.api.onfinality.io/public-ws");
  const entries = await api.query.staking.payee.entriesPaged();
  for (const [storageKey, value] of entries) {
    const addr = storageKey.args[0].toString();
    const rewardDestination = value.toJSON();
    console.log(addr, rewardDestination);
  }

  process.exit(0);
})();
