const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const kusamaEndPoint = "wss://kusama.api.onfinality.io/public-ws";
// const kusamaEndPoint = "wss://kusama-rpc.polkadot.io";
const kusamaEndPoint = "wss://kusama-rpc.dwellir.com";

async function getApi() {
  if (!api) {
    provider = new WsProvider(kusamaEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();
  const height = 18826988;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const block = await api.rpc.chain.getBlock(blockHash);
  const blockApi = await api.at(blockHash);
  const events = await blockApi.query.system.events();

  console.log(block);
  process.exit(0)
}

main()
