const { ApiPromise, WsProvider } = require("@polkadot/api");
let provider = null;
let api = null;
const { GenericMultiAddress } = require("@polkadot/types")

const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";
const dotEndPoint = "wss://polkadot.elara.patract.io/";

// const dotEndPoint = "wss://polkadot.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(dotEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();

  const blockHash = await api.rpc.chain.getBlockHash(6008455); // 38745
  const block = await api.rpc.chain.getBlock(blockHash);

  console.log(block)
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
