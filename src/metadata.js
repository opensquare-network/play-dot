const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const dotEndPoint = "wss://polkadot.elara.patract.io/";

async function getApi() {
  if (!api) {
    provider = new WsProvider(dotEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  await getApi();

  await getMetadata();
}

async function getMetadata() {
  const blockHash = await api.rpc.chain.getBlockHash(29231);
  const metadata = await api.rpc.state.getMetadata(blockHash);

  console.log(metadata)
}

main().catch(console.error).finally(() => {process.exit(0)});
