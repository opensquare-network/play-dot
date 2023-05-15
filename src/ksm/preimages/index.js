const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  // const height = 32298;
  // const blockHash = await api.rpc.chain.getBlockHash(height);
  // const blockApi = await api.at(blockHash);
  const blockApi = api;

  const hash = "0xf3872cfebdcb48512eeaf8914e442398b85ace552d0c172623f2e7341c80638d";
  const status = await blockApi.query.preimage.statusFor(hash);
  const len = Object.values(status.toJSON())[0].len;
  const raw = await blockApi.query.preimage.preimageFor([hash, len]);
  const call = blockApi.registry.createType("Proposal", raw.unwrap());

  console.log('section:', call.section);
  console.log('method:', call.method);
  console.log(call.toJSON());
  process.exit(0)
})();
