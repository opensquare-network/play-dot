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

  const blockHash = await api.rpc.chain.getBlockHash(5033194); // 38745
  const block = await api.rpc.chain.getBlock(blockHash);

  console.log(block)

  const addr = new GenericMultiAddress(api)
}

const str = '0x00c8e61cb732b7e68f6954114544822dadc4bf1c90ffa486e9c44c5ba0eadfa016'



main().catch(console.error).finally(() => {
  process.exit(0)
});
