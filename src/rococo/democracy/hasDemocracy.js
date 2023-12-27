const { getApi } = require("../api");
const { findBlockApiByHeight } = require("../../common/blockHash");

;(async () => {
  const height = 7829296; // polkadot democracy pallet is removed at this height

  const api = await getApi();
  const blockApi = await findBlockApiByHeight(height, api);

  const has = !!blockApi.query.democracy
  console.log("has", has);

  process.exit(0);
})();
