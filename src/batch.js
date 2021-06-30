const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const dotEndPoint = "wss://kusama.elara.patract.io/";

async function getApi() {
  if (!api) {
    provider = new WsProvider(dotEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  await getApi();

  const blockHash = await api.rpc.chain.getBlockHash(8107039);
  // const block = await api.rpc.chain.getBlock(blockHash);

  const allEvents = await api.query.system.events.at(blockHash);
  console.log(allEvents)
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
