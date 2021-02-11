const { ApiPromise, WsProvider } = require("@polkadot/api");
const { keyring, cryptoWaitReady } = require("@polkadot/ui-keyring");
const { GenericCall } = require("@polkadot/types");

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
  // await readTip(api)
  // await metadata(api)
  // await testMultisig();

  // await testRawCall(api)
  // await testBatch(api)
  await getBounty(api)
}

async function testBatch(api) {
  const blockHash = await api.rpc.chain.getBlockHash(5571590);
  const block = await api.rpc.chain.getBlock(blockHash);

  const extrinsics = block.block.extrinsics;

  console.log(block)
}

async function testRawCall(api) {
  const blockHash = await api.rpc.chain.getBlockHash(5379799);
  const registry = await api.getBlockRegistry(blockHash);
  const raw = '0x12063844124e14e714ba8b0ebd31b8153338fb3305aa3c524c298f6f83bf91befc500b00f0ab75a40d';
  const call = new GenericCall(registry.registry, raw);

  console.log(call)
}

async function testMultisig() {
  await cryptoWaitReady;

  keyring.loadAll({ ss58Format: 2, type: 'sr25519' });

  const addresses = ['HyBryanRsB1GGKa9ZfqvRc3XpTDipYyRvxNNyZYfWFcenhd', 'EindYaUViAdardcU5gzFbQxh1jCcuQwhoKQK9vi1e2MkAPd', 'HEkh52pShreLjbiGuewsnbXTeXFiq5mxqF3TffeHRjsbuN5']
  // const addresses = ['EindYaUViAdardcU5gzFbQxh1jCcuQwhoKQK9vi1e2MkAPd', 'HyBryanRsB1GGKa9ZfqvRc3XpTDipYyRvxNNyZYfWFcenhd', 'HEkh52pShreLjbiGuewsnbXTeXFiq5mxqF3TffeHRjsbuN5']
  const result = keyring.addMultisig(addresses, 2);

  const { address } = result.pair;
  console.log(address)
}

async function readTip(api) {
  const tipHash = '0xb96196146d4ca14cd3bfa777bc1b6689f8923446eb7172d75b882b055980155d';
  const blockHash = '0x795be3684f5cd1edac6a1296b9685d3af65afdffee768b54fa20ae2e1914edaa';
  const rawMeta = await api.query.treasury.tips.at(blockHash, tipHash);

  console.log(rawMeta.toJSON())
}

async function metadata(api) {
  // const metadata = await api.rpc.state.getMetadata('0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe');
  const metadata = await api.rpc.state.getMetadata();
  console.log("Magic number: " + metadata.magicNumber);
  console.log("Metadata: " + metadata.raw);
  console.log(metadata.toJSON())
}

async function getVoting(api) {
  const blockHash = '0xecdc04e286c797a32839e196212033d2072e7d0f07ed516b7102906f9000137e';
  const motionHash = '0x59fe7bd64951667f91f36db33077b1ada93b093b363a32cf869d2a833d72ce08';
  const votingObject = await api.query.council.voting.at(blockHash, motionHash);

  const json = votingObject.toJSON();
  console.log(json)
}

async function getBounty(api) {
  const blockHash = await api.rpc.chain.getBlockHash(6161169);
  const meta = await api.query.bounties.bounties.at(blockHash, 2);

  console.log(meta)
}

main().catch(console.error);
