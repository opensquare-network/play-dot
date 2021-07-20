const { ApiPromise, WsProvider } = require("@polkadot/api");
let provider = null;
let api = null;

const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";
const dotEndPoint = "wss://polkadot.elara.patract.io/";
const westmintEndPoint = "wss://westmint-rpc.polkadot.io/";

// const dotEndPoint = "wss://polkadot.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(westmintEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();
  const address = '5Dw5KnvTs96FaRQFez1Su15XMMJ65QAi4F1ugNBaXUBiGbX6'

  const preHeight = 109590
  const preBlockHash = await api.rpc.chain.getBlockHash(preHeight);
  const preAccount = await api.query.system.account.at(preBlockHash, address)
  const preFree = preAccount.data.free.toNumber()

  const height = 109591
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const account = await api.query.system.account.at(blockHash, address)
  const free = account.data.free.toNumber()

  console.log(`free - preFree: ${free - preFree}`)
  console.log(account.toJSON())
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
