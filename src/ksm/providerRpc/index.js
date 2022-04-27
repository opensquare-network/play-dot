const { getProvider } = require("../api");
const { GenericExtrinsic, TypeRegistry } = require("@polkadot/types")

;(async () => {
  const provider = await getProvider();
  const blockHash = await provider.send('chain_getFinalizedHead', []);
  const block = await provider.send('chain_getBlock', [blockHash])
  console.log(block);

  const extrinsic = new GenericExtrinsic(new TypeRegistry(), block.block.extrinsics[0]);
  console.log(extrinsic)

  await provider.disconnect()
})()
