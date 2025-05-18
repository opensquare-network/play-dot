const { getCommonApi } = require("../common/api");
(async () => {
  const api = await getCommonApi("wss://polkadot-asset-hub-rpc.polkadot.io/");
  const entries = await api.query.foreignAssets.asset.entries();
  const asset = await api.query.foreignAssets.asset(entries[0][0].args[0]);

  console.log(asset);
  process.exit(0);
})();
