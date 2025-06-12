const { getCommonApi } = require("../../common/api");
const { findBlockApiByHeight } = require("../../common/blockHash");

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const blockHeight = 26329988;
  const blockApi = await findBlockApiByHeight(blockHeight, api);

  const info = await blockApi.query.referenda.referendumInfoFor(1589);
  console.log(info);
  process.exit(0);
})();
