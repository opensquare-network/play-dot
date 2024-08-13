const { getApi } = require("./api");
const {
  blake2AsU8a,
  decodeAddress,
  xxhashAsU8a,
} = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

const section = xxhashAsU8a("System", 128);
const method = xxhashAsU8a("Account", 128);

function getAccountStorageKey(address) {
  const id = decodeAddress(address);
  const hash = blake2AsU8a(id, 128);

  return u8aToHex(new Uint8Array([...section, ...method, ...hash, ...id]));
}

(async () => {
  const api = await getApi();
  const address = "0xB7469C43535c826E29C30D25a9F3a035759cf132";
  const key = getAccountStorageKey(address);

  const storages = await api.rpc.state.queryStorageAt([key]);

  const accountInfo = api.registry.createType(
    "AccountInfo",
    storages[0].toHex(),
    true,
  );

  const id = decodeAddress(address);
  const info = await api.query.system.account(address);
  console.log(info);
})();
