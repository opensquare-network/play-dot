const { ApiPromise, WsProvider } = require("@polkadot/api");
const defaultKsmEndPoint = "wss://karura.kusama.elara.patract.io";
const { typesBundleForPolkadot } = require("@acala-network/type-definitions");

let provider = null;
let api = null;

async function getApi() {
  if (!api) {
    provider = new WsProvider(defaultKsmEndPoint);
    const options = { provider, typesBundle: { ...typesBundleForPolkadot } };
    api = await ApiPromise.create(options);
  }

  return api;
}

const eventsHex = '0x1800000000000000481a0b0b0000000002000000010000000000000000000000000002000000020000000c030082ee81501001d4485d38bca0e9bacecb4f701ea58f2c149281259a0cfcb5f6d57a00a8bbfe3508000000000000000000000000020000003600ee81501001d4485d38bca0e9bacecb4f701ea58f2c149281259a0cfcb5f6d57a008200a8bbfe35080000000000000000000002000200ee81501001d4485d38bca0e9bacecb4f701ea58f2c149281259a0cfcb5f6d57a00000200000014064393b8c700000000000000000000000000000200000000000065cd1d00000000000000'

async function main() {
  const api = await getApi();

  const allEvents = api.registry.createType(
    "Vec<EventRecord>",
    eventsHex,
    true
  );

  console.log(allEvents)
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
