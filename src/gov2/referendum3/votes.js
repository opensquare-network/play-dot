const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 86482;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

})();
