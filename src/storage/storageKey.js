const { blake2AsU8a, decodeAddress, xxhashAsU8a } = require("@polkadot/util-crypto")
const { u8aToHex } = require("@polkadot/util")
const { ApiPromise, WsProvider } = require("@polkadot/api");
let provider = null;
let api = null;

const section = xxhashAsU8a('System', 128)
const method = xxhashAsU8a('Account', 128)

const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";

async function getApi() {
  if (!api) {
    provider = new WsProvider(defaultKsmEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

function getAccountStorageKey(address) {
  const id = decodeAddress(address);
  const hash = blake2AsU8a(id, 128)

  return u8aToHex([...section, ...method, ...hash, ...id])
}

async function main() {
  const addr1 = 'DMHW1yWZS4qingUwcJRjZSJ8SvbvMUEKZL1oMiwcUXHBGWA';
  const addr2 = 'ESgz7GLVW7BL5DhRgpVnxSXVwaKt4ytWcrf52TY1GQD1cEb';
  const addr3 = 'JEzV35EHd63B15xY2b8VgZK7E3vmdEJidxS2j31ywkbMqgk'

  const keys = [addr1, addr2, addr3].map(getAccountStorageKey)
  console.log(keys);

  await getApi();

  const test = api.registry.createType('AccountInfo', null, true)
  console.log(test)
  const height = 8749872;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  console.log(blockHash.toString())

  const result = await api.rpc.state.queryStorageAt(keys, blockHash)
  const hexArr = result.map(i => i.toHex());

  const dataArr = hexArr.map(hex => {
    return api.registry.createType('AccountInfo', hex, true)
  })

  console.log(dataArr);
  provider.disconnect()
}

main()
