const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

// const dotEndPoint = "wss://polkadot.api.onfinality.io/public-ws";
const ksmEndPoint = "wss://kusama.api.onfinality.io/public-ws";
// const karEndPoint = "wss://karura-rpc-2.aca-api.network/ws"

async function getApi() {
  if (!api) {
    provider = new WsProvider(ksmEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  await getApi();

  // await getBlock()
  await queryProposal();
}

async function queryProposal() {
  const blockHash = await api.rpc.chain.getBlockHash(135713);
  const block = await api.rpc.chain.getBlock(blockHash);
  const props = await api.query.democracy.publicProps.at(blockHash);

  console.log(props)
}

main().catch(console.error).finally(() => {process.exit(0)});
