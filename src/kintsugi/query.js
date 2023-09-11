const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const kusamaEndPoint = "wss://api-dev-kintsugi.interlay.io/parachain";
const intrEndPoint = "wss://api.interlay.io/parachain";
const kintEndPoint = "wss://kintsugi.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(kintEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(3250720);
  const blockApi = await api.at(blockHash);
  const block = await api.rpc.chain.getBlock(blockHash);

  const p = await api.query.treasury.proposals(0)
  console.log(block);
}

main()
