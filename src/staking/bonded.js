const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const staking = await api.query.staking.bonded("15DDzN4SuQjM35MkSQdtwTXy5dYvA2LnLFu1LNvweHmeCZfg");

  console.log(staking);
})();
