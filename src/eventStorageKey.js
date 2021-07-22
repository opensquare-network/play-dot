const { u8aConcat, compactAddLength, u8aToHex } = require("@polkadot/util")
const { xxhashAsU8a } = require("@polkadot/util-crypto");

(() => {
  const u8a = u8aConcat(xxhashAsU8a('system', 128), xxhashAsU8a('events', 128))
  const uu = compactAddLength(u8a)

  console.log(u8aToHex(uu))
})()
