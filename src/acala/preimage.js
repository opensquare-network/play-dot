const { getApi } = require("./api");

;(async () => {
  const api = await getApi();

  const height = 5258454;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const hash = "0x98838ddc1ca53d05f7b00a47da1fa0a559cca38e6a16c943a6c2e6dbc03f598f";
  const status = await blockApi.query.preimage.statusFor(hash);
  const len = 3;

  const rawPreimage = await blockApi.query.preimage.preimageFor([hash, len]);
  const bytes = rawPreimage.unwrap();
  const proposal = blockApi.registry.createType("Proposal", bytes);
  console.log(proposal);

  process.exit(0);
})();
