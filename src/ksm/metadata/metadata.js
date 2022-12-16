const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  // const height = 15426832;
  const height = 15682703;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  // const metadata = await api.rpc.state.getMetadata(blockHash)
  // console.log(metadata.toJSON())

  const blockApi = await api.at(blockHash)

  const info =await blockApi.query.democracy.referendumInfoOf(40)
  console.log(info.toJSON())

  process.exit(0);
})()
