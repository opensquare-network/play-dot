const { getApi } = require("./api");

(async () => {
  const api = await getApi();
  const blockHeight = 333924;
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  const block = await api.rpc.chain.getBlock(blockHash);

  const extrinsic = block.block.extrinsics[3];
  const opaqueCallArg = extrinsic.method.args[3]; // type: OpaqueCall === Bytes

  const blockApi = await api.at(blockHash);
  try {
    const call = blockApi.registry.createType("GenericCall", opaqueCallArg);
  } catch (e) {
    console.log(e);
  }

  console.log(extrinsic);

})();
