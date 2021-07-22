const { ApiPromise, WsProvider } = require("@polkadot/api");
let provider = null;
let api = null;

const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";
const dotEndPoint = "wss://polkadot.elara.patract.io/";
const westmintEndPoint = "wss://westmint-rpc.polkadot.io/";

async function getApi() {
  if (!api) {
    provider = new WsProvider(westmintEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();

  const height = 109591
  const blockHash = await api.rpc.chain.getBlockHash(height); // 38745
  const block = await api.rpc.chain.getBlock(blockHash)

  // Downward Messages mean the messages from relay chain
  const downwardMessages = block.block.extrinsics[0].method.args[0].get('downwardMessages')

  // https://next.statescan.io/westmint/block/109591?tab=extrinsics
  const pubMsg = downwardMessages[0].pubMsg

  const versionedXcm = api.registry.createType('VersionedXcm', pubMsg, true)
  if (!versionedXcm.isV0) {
    return
  }

  const v0Xcm = versionedXcm.asV0
  if (!v0Xcm.isTeleportAsset) {
    return
  }

  const teleportAssetMessage = v0Xcm.asTeleportAsset
  for (const asset of teleportAssetMessage.assets) {
    if (!asset.isConcreteFungible) {
      continue
    }

    const fungible = asset.asConcreteFungible
    const id = fungible.id
    if (isFromParent(id)) {
      const amount = fungible.amount.toNumber()
      console.log(`amount: ${amount}`)
    }
  }
}

function isFromParent(id) {
  if (id.isX1) {
    const x1 = id.asX1
    return x1.isParent
  }
  return false
}

//
async function main2() {
  const api = await getApi();

  const height = 216955
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const block = await api.rpc.chain.getBlock(blockHash);

  // Downward Messages mean the messages from relay chain
  const downwardMessages = block.block.extrinsics[0].method.args[0].get('downwardMessages')

  // https://next.statescan.io/westmint/block/109591?tab=extrinsics
  const pubMsg = downwardMessages[0].pubMsg

  const versionedXcm = api.registry.createType('VersionedXcm', pubMsg, true)
  if (!versionedXcm.isV0) {
    return
  }

  const v0Xcm = versionedXcm.asV0
  if (!v0Xcm.isTeleportAsset) {
    return
  }

  const teleportAsset = v0Xcm.asTeleportAsset
  console.log(teleportAsset)

}

main2().catch(console.error).finally(() => {
  process.exit(0)
});
