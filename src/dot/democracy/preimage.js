const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 1511244;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await api.at(blockHash);
  const raw = await blockApi.query.democracy.preimages("0xe44631aec9d6257c4a7e7fab5393c2f6627216d165c5ebe39d9937ce5dfed762");

  console.log(raw.toJSON());

  process.exit(0)
})()
