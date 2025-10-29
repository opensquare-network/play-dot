const { getCommonApi } = require("../common/api");
const { findBlockApiByHeight } = require("../common/blockHash");

(async () => {
  const api = await getCommonApi("wss://polkadot-collectives-rpc.polkadot.io/");
  const blockApi = await findBlockApiByHeight(7475265, api);

  const rawInfo = await blockApi.query.fellowshipCollective.members("15G1iXDLgFyfnJ51FKq1ts44TduMyUtekvzQi9my4hgYt2hs");
  console.log(rawInfo);
  process.exit(0);
})()
