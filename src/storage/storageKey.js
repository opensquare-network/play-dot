const { blake2AsU8a, decodeAddress, xxhashAsU8a } = require("@polkadot/util-crypto")
const { u8aToHex } = require("@polkadot/util")

const section = xxhashAsU8a('System', 128)
const method = xxhashAsU8a('Account', 128)

function main() {

  const addr = 'DMHW1yWZS4qingUwcJRjZSJ8SvbvMUEKZL1oMiwcUXHBGWA';
  const id = decodeAddress(addr);
  console.log(u8aToHex(id))
  const hash = blake2AsU8a(id, 128)

  const hex = u8aToHex([...section, ...method, ...hash, ...id])
  console.log(hex)
}

main()
