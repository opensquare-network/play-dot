const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const kusamaEndPoint = "wss://api-dev-kintsugi.interlay.io/parachain";

async function getApi() {
  if (!api) {
    provider = new WsProvider(kusamaEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(4128);
  const block = await api.rpc.chain.getBlock(blockHash);

  const p = await api.query.treasury.proposals(0)
  console.log(block);
}

main()
