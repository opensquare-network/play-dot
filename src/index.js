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
  await readTip(api)
}

async function readTip(api) {
  const tipHash = '0xb96196146d4ca14cd3bfa777bc1b6689f8923446eb7172d75b882b055980155d';
  const blockHash = '0x795be3684f5cd1edac6a1296b9685d3af65afdffee768b54fa20ae2e1914edaa';
  const rawMeta = await api.query.treasury.tips.at(blockHash, tipHash);

  console.log(rawMeta.toJSON())
}

async function metadata(api) {
  const metadata = await api.rpc.state.getMetadata('0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe');
  console.log("Magic number: " + metadata.magicNumber);
  console.log("Metadata: " + metadata.raw);
  console.log(metadata.toJSON())
}

main().catch(console.error);
