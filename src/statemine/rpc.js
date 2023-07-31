

const { ApiPromise, WsProvider } = require("@polkadot/api");
let provider = null;
let api = null;

// const statemineEndPoint = "wss://kusama-statemine-rpc.paritytech.net";
const statemineEndPoint = "wss://statemine.api.onfinality.io/public-ws";
// const statemineEndPoint = "wss://pub.elara.patract.io/statemine";

async function getApi() {
  if (!api) {
    provider = new WsProvider(statemineEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

(async () => {
  const api = await getApi();

  // const hash = await api.rpc.chain.getFinalizedHead()
  // const head = await api.rpc.chain.getHeader(hash);
  const hash = await api.rpc.chain.getBlockHash(5000000);

  console.log(hash)
})()
