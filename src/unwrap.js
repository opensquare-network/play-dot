const { ApiPromise, WsProvider } = require("@polkadot/api");
const { GenericCall } = require("@polkadot/types")
const { createKeyMulti, encodeAddress } = require("@polkadot/util-crypto");

let provider = null;
let api = null;

const dotEndPoint = "wss://kusama-rpc.polkadot.io";

async function getApi() {
  if (!api) {
    provider = new WsProvider(dotEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  await getApi();

  const blockHash = await api.rpc.chain.getBlockHash(8024549);
  const block = await api.rpc.chain.getBlock(blockHash);

  await handleExtrinsic(block.block.extrinsics[4])
}

async function handleExtrinsic(extrinsic) {
  const signer = extrinsic._raw.signature.signer.toString()
  await handleCall(extrinsic.method, signer)
}

async function handleCall(call, signer) {
  const { section, method } = call

  if ('utility' === section && 'batch' === method) {
    await unwrapBatch(call, signer)
  } else if ('proxy' === section && 'proxy' === method) {
    await unwrapProxy(call, signer)
  } else if ('multisig' === section && 'asMulti' === method) {
    await handleMultisig(call, signer)
  }

  console.log(section, method)
}

async function handleMultisig(call, signer) {
  // TODO: calc the real caller: the mutisig address
  const callHex = call.args[3]
  const threshold = call.args[0].toNumber()
  const otherSignatories = call.args[1].toJSON()
  const multisigAddr = getMultiSigExtrinsicAddress(signer, threshold, otherSignatories, call.registry.ss58Prefix)

  const innerCall = new GenericCall(call.registry, callHex)
  await handleCall(innerCall, multisigAddr)
}

function getMultiSigExtrinsicAddress(signer, threshold, otherSignatories, chainSS58) {
  const multiAddresses = [signer, ...otherSignatories];
  const multiPub = createKeyMulti(multiAddresses, threshold);
  return encodeAddress(multiPub, chainSS58);
}

async function unwrapProxy(call, signer) {
  await handleCall(call.args[2], signer)
}

async function unwrapBatch(call, signer) {
  for (const innerCall of call.args) {
    await handleCall(innerCall, signer)
  }
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
