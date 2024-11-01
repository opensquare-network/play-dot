const { getApi } = require("./api");

(async () => {
  const api = await getApi();
  const block = await api.rpc.chain.getBlock();
  // todo: 1. get block
  const firstExtrinsic = block.block.extrinsics[0];
  console.log("coretime number", block.block.header.number.toNumber());
  console.log("relay number", firstExtrinsic.method.args[0].validationData.relayParentNumber.toNumber());

  process.exit(0);
})();
