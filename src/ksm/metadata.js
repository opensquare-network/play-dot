const { getApi } = require("./api");

;(async () => {
  const api = await getApi();

  const height = 4614887;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  console.log(blockApi);

  // 4614887
  const metadata = await api.rpc.state.getMetadata();
  console.log(metadata);
})()
