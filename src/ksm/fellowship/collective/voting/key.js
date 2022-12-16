const { encodeAddress } = require("@polkadot/util-crypto")

/**
 * // Fellowship voting storage: (pollIndex, address, VoteRecord)
 * // key u8a[] composition:
 * // 1. section + method = 32;
 * // 2. pollIndex blake_128 hash = 16;
 * // 3. pollIndex U16 4;
 * // 4. account twox_64 hash = 8;
 * // 5. account = 32;
 * // total = 92
 */
function extractPollIndexAndAddress(storageKey = [], api) {
  const sectionRemoved = storageKey.slice(32);
  const pollIndexHashRemoved = sectionRemoved.slice(16);
  const pollIndexU8a = pollIndexHashRemoved.slice(0, 4);

  const pollIndex = api.registry.createType('U16', pollIndexU8a).toNumber();
  const pollIndexRemoved = pollIndexHashRemoved.slice(4);

  // left 32 byte is the account id
  const accountHashRemoved = pollIndexRemoved.slice(8);
  const address = encodeAddress(accountHashRemoved, api.registry.chainSS58);

  return {
    pollIndex,
    address,
  }
}

module.exports = {
  extractPollIndexAndAddress,
}
