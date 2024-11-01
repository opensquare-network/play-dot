const { getApi } = require("../api");
const { findBlockHash } = require("../../common/blockHash");

(async () => {
  const api = await getApi();
  const height = 23077189;
  const blockHash = await findBlockHash(height, api);
  const blockFromNode = await api.rpc.chain.getBlock(blockHash);

  console.log(blockFromNode);
})();
