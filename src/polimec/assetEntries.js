const { getCommonApi } = require("../common/api");
const { findBlockApiByHeight } = require("../common/blockHash");

(async () => {
  const api = await getCommonApi("wss://polimec.rpc.amforc.com/");
  const blockApi = await findBlockApiByHeight(3323988, api);
  const entries = await blockApi.query.foreignAssets.asset.entries();
  for (const [storageKey, option] of entries) {
    const location = storageKey.args[0].toJSON();
    console.log(location, option);
  }

  process.exit(0);
})();
