const { getApi } = require("../api");
const { hexToU8a } = require("@polkadot/util");

;(async () => {
  const api = await getApi();
  const height = 1511244;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const blockApi = await api.at(blockHash);
  const raw = await blockApi.query.democracy.preimages("0xe44631aec9d6257c4a7e7fab5393c2f6627216d165c5ebe39d9937ce5dfed762");

  const call = blockApi.registry.createType("Proposal", raw.unwrap().asAvailable.data);

  console.log('section:', call.section);
  console.log('method:', call.method);
  console.log(call.toJSON());

  process.exit(0)
})()
