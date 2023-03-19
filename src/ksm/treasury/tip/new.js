const { getApi } = require("../../api");

;(async () => {
  const api = await getApi();
  // const height = 2872800;
  const height = 602672;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const meta = await blockApi.query.treasury?.tips("0x3a8576a1d7f9110e5d13d512bb8374bc0843da026dead68707462bb7f3e448b1");
  console.log(meta);
})();
