const { ApiPromise, WsProvider } = require("@polkadot/api");
let provider = null;
let api = null;

const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";
const dotEndPoint = "wss://polkadot.elara.patract.io/";
const westmintEndPoint = "wss://westmint-rpc.polkadot.io/";
const statemineEndPoint = "wss://kusama-statemine-rpc.paritytech.net";

// const dotEndPoint = "wss://polkadot.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(statemineEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();
  // const address = '5Dw5KnvTs96FaRQFez1Su15XMMJ65QAi4F1ugNBaXUBiGbX6'
  const address = 'EY1js3mL4RDgNKse3y4gozpfLHSzRTeUcobn3DWVK23ZpTM'

  const preHeight = 78233
  const preBlockHash = await api.rpc.chain.getBlockHash(preHeight);
  const preAccount = await api.query.system.account.at(preBlockHash, address)
  console.log(preHeight, preAccount.data.toJSON())
  const preFree = preAccount.data.free.toNumber()

  const height = 78235
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const account = await api.query.system.account.at(blockHash, address)
  const free = account.data.free.toNumber()

  // console.log(`free - preFree: ${free - preFree}`)
  console.log(height, account.data.toJSON())
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
