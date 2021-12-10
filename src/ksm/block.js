const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const kusamaEndPoint = "wss://kusama.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(kusamaEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(10373931);
  const block = await api.rpc.chain.getBlock(blockHash);

  console.log(block);
}

main()
