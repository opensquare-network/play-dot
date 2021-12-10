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
  // const height = 10447501; parainherent#enter 里边有statemine进来
  const height = 10447946;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const block = await api.rpc.chain.getBlock(blockHash);

  const allEvents = await api.query.system.events.at(blockHash);

  console.log(block);
}

main()
