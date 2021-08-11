const { ApiPromise, WsProvider } = require("@polkadot/api");
const { GenericBlock, TypeRegistry, Metadata } = require("@polkadot/types")
const { getSpecTypes, getSpecHasher, getSpecAlias, getSpecExtensions, } = require("@polkadot/types-known")
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

  const [runtimeVersion, chain, properties] = await Promise.all([
    api.rpc.state.getRuntimeVersion(blockHash),
    api.rpc.system.chain(),
    api.rpc.system.properties()
  ])

  const registry = new TypeRegistry(blockHash);
  const rawMetadata = await api.rpc.state.getMetadata(blockHash)
  const metadata = new Metadata(registry, rawMetadata);

  registry.setChainProperties(properties);
  registry.register(getSpecTypes(registry, chain, runtimeVersion.specName, runtimeVersion.specVersion))
  registry.setHasher(getSpecHasher(registry, chain, runtimeVersion.specName));

  if (registry.knownTypes.typesBundle) {
    registry.knownTypes.typesAlias = getSpecAlias(registry, chain, runtimeVersion.specName);
  }

  registry.setMetadata(metadata, undefined, {
    ...getSpecExtensions(registry, chain, runtimeVersion.specName),
  });

  return registry
}

async function main() {
  const registry = await getRegistryByHeight(66686)
  const block = new GenericBlock(registry, block66687.block.block);

  console.log(block)
}

main()
