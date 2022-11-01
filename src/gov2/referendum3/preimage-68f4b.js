const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 32298;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const hash = "0x68f4b30505dec1ac8e5a60f12e776bfb4aa8301e520dfa43f2c05cf3f2296d0f";
  const status = await blockApi.query.preimage.statusFor(hash);
  const len = Object.values(status.toJSON())[0].len;
  const raw = await blockApi.query.preimage.preimageFor(["0x68f4b30505dec1ac8e5a60f12e776bfb4aa8301e520dfa43f2c05cf3f2296d0f", len]);
  const call = blockApi.registry.createType("Proposal", raw.unwrap());

  console.log('section:', call.section);
  console.log('method:', call.method);
  console.log(call.toJSON());
  process.exit(0)
})();
