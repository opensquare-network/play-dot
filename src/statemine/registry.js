const { ApiPromise, WsProvider } = require("@polkadot/api");
const { GenericBlock, } = require("@polkadot/types")
const { block66686, block66687, } = require("./block")
let provider = null;
let api = null;

const statemineEndPoint = "wss://kusama-statemine-rpc.paritytech.net";

async function getApi() {
  if (!api) {
    provider = new WsProvider(statemineEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function getRegistryByHeight(height) {
  await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);

  return await api.getBlockRegistry(blockHash);
}

async function main() {
  const registry = await getRegistryByHeight(66686)
  const block = new GenericBlock(registry.registry, block66687.block.block);

  console.log(block)
}

main()
