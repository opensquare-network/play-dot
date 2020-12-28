const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";

async function getApi() {
  if (!api) {
    const ws_endpoint = process.env.WS_ENDPOINT || defaultKsmEndPoint;
    provider = new WsProvider(ws_endpoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();

  const metadata = await api.rpc.state.getMetadata('0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe');
  console.log("Magic number: " + metadata.magicNumber);
  console.log("Metadata: " + metadata.raw);
  console.log(metadata.toJSON())
}

main().catch(console.error);
