const { ApiPromise, WsProvider } = require("@polkadot/api");
let provider = null;
let api = null;

const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";
const dotEndPoint = "wss://polkadot.elara.patract.io/";

// const dotEndPoint = "wss://polkadot.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(dotEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();
  const address = '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv'

  const info = await api.derive.accounts.info(address);
  const subs = await api.query.identity?.subsOf(address)
  console.log(info, subs)
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
