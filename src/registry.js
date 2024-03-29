const { block29232, block29232AllEventsHex, block29232Event0, ksmBlock33895 } = require("./hex")
const { GenericBlock, GenericExtrinsic, Vec } = require("@polkadot/types")
const { hexToU8a } = require("@polkadot/util")
const obj = require("@polkadot/types/interfaces")

const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const dotEndPoint = "wss://polkadot.elara.patract.io/";
const kusamaEndPoint = "wss://kusama.elara.patract.io/";

async function getApi() {
  if (!api) {
    provider = new WsProvider(kusamaEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  await getApi();

  await composeBlock()
}

async function composeBlock() {
  const height = 34432;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  // const registry = new TypeRegistry()
  // registry.setChainProperties(api.registry.getChainProperties())
  // registry.setMetadata(metadata)
  const blockFromNode = await api.rpc.chain.getBlock(blockHash);
  console.log(blockFromNode)

  console.log('hex', blockFromNode.toHex())

  const registry = await api.getBlockRegistry(blockHash)
  //
  // const events = registry.registry.createType('Vec<EventRecord>', block29232AllEventsHex, true)
  // const event = new GenericEvent(registry.registry, hexToU8a(block29232Event0))
  // console.log(event)
  // const allEvents = new Vec(registry.registry, GenericEvent, block29232AllEventsHex)
  // console.log(allEvents)

  const block = new GenericBlock(registry.registry, hexToU8a(ksmBlock33895))
  for (let extrinsic of block.extrinsics) {
    const ex = new GenericExtrinsic(registry, extrinsic.toU8a())
    console.log(ex)
  }

  console.log(block)
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
