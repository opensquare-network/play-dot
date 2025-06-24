const { getCommonApi } = require("../../common/api");

(async () => {
  const api = await getCommonApi("wss://rpc.ibp.network/paseo");
  const payee = await api.query.staking.payee("118a1C8pkEuBcTuRPCHVh6JjaPm2Yq6vLK4CVKmMh3DXDjW");
  // for (const [storageKey, value] of entries) {
  //   const addr = storageKey.args[0].toString();
  //   const rewardDestination = value.toJSON();
  //   console.log(addr, rewardDestination);
  // }

  console.log(payee);
  process.exit(0);
})();
