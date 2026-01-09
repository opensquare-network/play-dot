const { getCommonApi } = require("./api");
const { findBlockApiByHeight } = require("./blockHash");

const blockHeight = 28490502;

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const blockApi = await findBlockApiByHeight(blockHeight, api);
  const rawInfo = await blockApi.query.referenda.referendumInfoFor(1767);
  console.log("rawInfo", rawInfo);
  process.exit(0);
})();
