const { ApiPromise, WsProvider } = require("@polkadot/api");
const { keyring, cryptoWaitReady } = require("@polkadot/ui-keyring");
const { GenericCall, UInt, Percent, Permill } = require("@polkadot/types");
const { expandMetadata } = require("@polkadot/metadata");
const { u8aToHex, compactStripLength } = require("@polkadot/util");

let provider = null;
let api = null;

const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";
const dotEndPoint = "wss://polkadot.elara.patract.io/";

async function getApi() {
  if (!api) {
    provider = new WsProvider(dotEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  const api = await getApi();

  await queryProperties()
  // await testNewTipsModule(api)

  // await querySystemAccount(api);
  // await qBalance(api);
  // await querySystemAccount()
  // await queryBalance(api);
  // await getTippersCount(api);

  // await readTip(api)
  // await metadata(api)
  // await testMultisig();

  // await testRawCall(api)
  // await testBatch(api)
  // await getBounty(api)
  // const p = new UInt(0xd0070000);
  //
  // console.log(p)
  // console.log(Permill);
  // await testQueryConst(api)
}

const TreasuryAccount = "F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29";
const dotTreasuryAccount = "13UVJyLnbVp9RBZYFwFGyDvVd1y27Tt8tkntv6Q7JVPhFsTB";

async function queryProperties() {
  const properties = await api.rpc.system.properties()
  console.log(properties)
}

async function querySystemAccount() {
  const blockHash = await api.rpc.chain.getBlockHash(328745);
  const a1 = await api.query.system.account.at(blockHash, TreasuryAccount);
  console.log(a1.toJSON())
}

async function qBalance(api) {
  // 1492896
  const blockHash = await api.rpc.chain.getBlockHash(1492895);

  const metadata = await api.rpc.state.getMetadata(blockHash);
  const decorated = expandMetadata(metadata.registry, metadata);

  const value = await api.rpc.state.getStorage([decorated.query.balances.freeBalance, TreasuryAccount], blockHash);
  console.log(metadata.registry.createType('Compact<Balance>', value).toJSON());
}

async function getOldKey(api) {
  const blockHash = await api.rpc.chain.getBlockHash(1375085);

  const metadata = await api.rpc.state.getMetadata(blockHash);
  const decorated = expandMetadata(metadata.registry, metadata);

  return [decorated.query.balances.freeBalance, TreasuryAccount]
}
async function queryBalance(api) {
  const blockHash = await api.rpc.chain.getBlockHash(1377831);
  const metadata = await api.rpc.state.getMetadata(blockHash);

  // const decorated = expandMetadata(metadata.registry, metadata);
  // const k = [decorated.query.balances.account, TreasuryAccount];

  const key = await getOldKey(api);
  const value = await api.rpc.state.getStorage(key, blockHash);
  console.log(metadata.registry.createType('Compact<Balance>', value).toJSON());
}

async function testNewTipsModule(api) {
  const blockHash = await api.rpc.chain.getBlockHash(3899547);
  const metadata = await api.rpc.state.getMetadata(blockHash);

  const modules = metadata.toJSON().metadata.V12.modules
  const hasTips = !!modules.find(module => module.name === 'Tips')

  console.log('hasModules', !!modules, 'hasTips', hasTips)
}

async function testQueryConst(api) {
  console.log(api);
  const registry = await api.getBlockRegistry('0x954eabfbfba5e8f9d9dd1475b123968c3be73e58ecbb58fc4f88f8ba475f2a2b');
  const Type = api.registry.get('Permill');
  const v = registry.metadata.get('metadata')['asV12'].get('modules')[20].get('constants')[3].get('value');


  const aaa = new Type(registry, v).toHuman();

  return api.consts.treasury.burn.toHuman();
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

async function getTippersCount(api) {
  const blockHash = '0x7cffec4ac944ba0e88b93348f369ebca6d24a7851bec7b7f25edc6c33fe70148';

  const members = await api.query.electionsPhragmen.members.at(blockHash);
  const Type = api.query.electionsPhragmen.members.meta.type;

  const t = new Type(members);
  console.log(t);
  return members.length;
}

main().catch(console.error).finally(() => {process.exit(0)});
