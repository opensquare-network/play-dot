const { ApiPromise, WsProvider } = require("@polkadot/api");
let provider = null;
let api = null;
const { xxhashAsHex } = require("@polkadot/util-crypto")

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
  await getApi();
  await getKeys();
  // await getInfo();
}

async function getInfo() {
  const address = '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv'

  const info = await api.derive.accounts.info(address);
  const subs = await api.query.identity?.subsOf(address)
  console.log(info, subs)
}

async function getKeys() {
  // await api.query.identity.identityOf

  // const modulePrefix = xxhashAsHex('bounties')
  // console.log('modulePrefix', modulePrefix)
  //
  // const keyPrefix = xxhashAsHex('bounties')
  // console.log('keyPrefix', keyPrefix)

  const entries = await api.query.identity.identityOf.entries()
  console.log(entries)

  const superInfo = await api.query.identity.superOf.entries()
  console.log(superInfo)
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
