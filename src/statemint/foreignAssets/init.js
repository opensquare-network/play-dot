const { getCommonApi } = require("../../common/api");
const { findBlockApiByHeight } = require("../../common/blockHash");

(async () => {
  const api = await getCommonApi("wss://polkadot-asset-hub-rpc.polkadot.io/");
  const height = 4160197;
  // const height = 4160196;
  const blockApi = await findBlockApiByHeight(height, api);
  const entries = await blockApi.query.foreignAssets.asset.entries();
  for (const [storageKey, option] of entries) {
    const location = storageKey.args[0].toJSON();
    console.log(location, option);
  }

  process.exit(0);
})();
