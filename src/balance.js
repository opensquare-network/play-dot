const { ApiPromise, WsProvider } = require("@polkadot/api");
const {
  blake2AsU8a,
  decodeAddress,
  xxhashAsU8a,
} = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

let provider = null;
let api = null;

// const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";
const defaultKsmEndPoint = "wss://kusama-rpc.polkadot.io";
// const defaultKsmEndPoint = "wss://kusama.api.onfinality.io/public-ws";
const dotEndPoint = "wss://polkadot.elara.patract.io/";
const westmintEndPoint = "wss://westmint-rpc.polkadot.io/";
// const statemineEndPoint = "wss://kusama-statemine-rpc.paritytech.net";

// const dotEndPoint = "wss://polkadot.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(defaultKsmEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

function getFreeBalanceAccountKey(address) {
  const section = xxhashAsU8a("Balances", 128);
  const method = xxhashAsU8a("FreeBalance", 128);

  const id = decodeAddress(address);
  const hash = blake2AsU8a(id, 256);

  return u8aToHex([...section, ...method, ...hash,]);
}

function getSystemAccountBlake256(address) {
  const section = xxhashAsU8a("System", 128);
  const method = xxhashAsU8a("Account", 128);

  const id = decodeAddress(address);
  const hash = blake2AsU8a(id, 256);
  return u8aToHex([...section, ...method, ...hash,]);
}

function getSystemAccountKey(address) {
  const section = xxhashAsU8a("System", 128);
  const method = xxhashAsU8a("Account", 128);

  const id = decodeAddress(address);
  const hash = blake2AsU8a(id, 128);

  return u8aToHex([...section, ...method, ...hash, ...id]);
}

async function getTreasuryAccount() {
  const TreasuryAccount = "F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29";

  // const height = 45458
  const height = 6000000
  // const height = 1445458
  // const height = 1472960
  // const height = 1475648
  // const height = 1491596
  // [1445458 - 1574408)

  // 1491596 - 1574408
  // const height = 1492896
  // const height = 1492895
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const metadata = await api.rpc.state.getMetadata(blockHash);

  const system256Key = getSystemAccountBlake256(TreasuryAccount)

  const balancesKey = getFreeBalanceAccountKey(TreasuryAccount);
  console.log('balancesKey', balancesKey)
  const systemKey = getSystemAccountKey(TreasuryAccount);

  const balancesValue = await api.rpc.state.getStorage(balancesKey, blockHash);
  const systemValue = await api.rpc.state.getStorage(systemKey, blockHash);
  const system256Value = await api.rpc.state.getStorage(system256Key, blockHash);

  console.log('balancesValue', balancesValue.toHex())
  console.log('systemValue', systemValue.toHex())
  console.log('system256Value', system256Value.toHex())

  await provider.disconnect()
}

async function main() {
  const api = await getApi();
  await getTreasuryAccount();
  // const address = '5Dw5KnvTs96FaRQFez1Su15XMMJ65QAi4F1ugNBaXUBiGbX6'
  // const address = 'JEzV35EHd63B15xY2b8VgZK7E3vmdEJidxS2j31ywkbMqgk'
  //
  // const preHeight = 106469
  // const preBlockHash = await api.rpc.chain.getBlockHash(preHeight);
  // const preAccount = await api.query.system.account.at(preBlockHash, address)
  // console.log(preHeight, preAccount.data.toJSON())
  // const preFree = preAccount.data.free.toNumber()
  //
  // const height = 78235
  // const blockHash = await api.rpc.chain.getBlockHash(height);
  //
  // const account = await api.query.system.account.at(blockHash, address)
  // const free = account.data.free.toNumber()

  // console.log(`free - preFree: ${free - preFree}`)
  // console.log(height, account.data.toJSON())
}

main().catch(console.error).finally(() => {
  process.exit(0)
});
