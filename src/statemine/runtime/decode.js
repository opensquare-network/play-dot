const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  // const height = 2872800;
  const height = 3645270;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  console.log(blockApi);
})()
