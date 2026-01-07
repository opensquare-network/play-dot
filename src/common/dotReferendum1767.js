const { getCommonApi } = require("./api");
const { findBlockApiByHeight } = require("./blockHash");

const blockHeight = 28490502;

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const blockApi = await findBlockApiByHeight(blockHeight, api);
  const rawInfo = await blockApi.query.referenda.referendumInfoFor(1767);
  console.log("rawInfo", rawInfo);
  {
    "ayes": 2257272814517,
    "nays": "0x0000000000000000054d23204fd09772",
    "support": 48043491975727
  }
  process.exit(0);
})();
