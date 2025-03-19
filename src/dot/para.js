const { getCommonApi } = require("../common/api");
const { findBlockApiByHeight } = require("../common/blockHash");
(async () => {
  const api = await getCommonApi("wss://polkadot.api.onfinality.io/public-ws");
  const blockApi = await findBlockApiByHeight(13021525, api);
  const now = await api.query.paras.mostRecentContext(1000);
  console.log("now", now.toJSON());
  const heads = await blockApi.query.paras.heads(1000)
  const num = await blockApi.query.paras.mostRecentContext(1000);
  console.log(num.toJSON());
  process.exit(0);
})()
