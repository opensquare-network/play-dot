const { getCommonApi } = require("../common/api");
const { findBlockApiByHeight } = require("../common/blockHash");

(async () => {
  const api = await getCommonApi("wss://polkadot-coretime-rpc.polkadot.io");
  const blockApi = await findBlockApiByHeight(728412, api);
  const num = await blockApi.query.parachainSystem.lastRelayChainBlockNumber();
  console.log(num.toJSON());
  process.exit(0);
})()
