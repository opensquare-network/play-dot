const { getCommonApi } = require("./api");
const { findBlockApiByHeight } = require("./blockHash");

(async () => {
  const api = await getCommonApi("wss://rpc-asset-hub-kusama.luckyfriday.io");
  const blockApi = await findBlockApiByHeight(12723858, api);
  const num = await blockApi.query.parachainSystem.lastRelayChainBlockNumber();
  console.log(num.toJSON());
  process.exit(0);
})()
