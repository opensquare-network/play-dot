const { getApi } = require("./api");
const {
  blake2AsU8a,
  decodeAddress,
  xxhashAsU8a,
} = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util")

const section = xxhashAsU8a("Assets", 128);
const method = xxhashAsU8a("Account", 128);

function blake2Concat(u8a) {
  const hash = blake2AsU8a(u8a, 128);
  return [...hash, ...u8a]
}

function getStorageKey(assetId, account, api) {
  const assetIdU8a = api.registry.createType('AssetId', assetId, true).toU8a();
  const accountIdU8a = decodeAddress(account);

  return u8aToHex(new Uint8Array([
    ...section,
    ...method,
    ...blake2Concat(assetIdU8a),
    ...blake2Concat(accountIdU8a)
  ]));
}

async function main() {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(757876);

  const section = '0x682a59d51ab9e48a8c8cc418ff9708d2';
  const method = '0xb99d880ec681799c0cf30e8886371da9';
  const aKey = '0x682a59d51ab9e48a8c8cc418ff9708d2' +
    'b99d880ec681799c0cf30e8886371da9' +
    'be1f3931028cc05c2e18a319e8f64f9e08000000' +
    '7de1acc72d42c39944451b6bdf599ae80aff6865635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b'

  const rightKey = '0x682a59d51ab9e48a8c8cc418ff9708d2b99d880ec681799c0cf30e8886371da9be1f3931028cc05c2e18a319e8f64f9e080000007de1acc72d42c39944451b6bdf599ae80aff6865635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b'
  const testtKey = '0x682a59d51ab9e48a8c8cc418ff9708d2' +
    'b99d880ec681799c0cf30e8886371da9' +
    'de628dc1c21599249729d197ce67c6f400000008' +
    '7de1acc72d42c39944451b6bdf599ae80aff6865635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b';

  const assetId = 8;
  const account = 'CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp';
  const key = getStorageKey(8, account, api);
  const keys = [key]
  const result = await api.rpc.state.queryStorageAt(keys, blockHash);
  const blockApi = await api.at(blockHash);
  const fromStorage = blockApi.registry.createType('AssetBalance', result[0].toHex(), true).toJSON();
  console.log(fromStorage)

  const details = await blockApi.query.assets.account(assetId, account)
  console.log(details.toJSON())
}

main()
