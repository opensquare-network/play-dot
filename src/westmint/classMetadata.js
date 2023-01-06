const { getApi } = require("./api");
const { hexToString } = require("@polkadot/util");

;(async () => {
  const api = await getApi()
  const height = 2096247; // referendum index: 0
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const metadata = await blockApi.query.uniques.classMetadataOf(5);
  const data = metadata.unwrap().toJSON().data;
  const str = hexToString(data);
  console.log(metadata);
  process.exit(0);
})();
