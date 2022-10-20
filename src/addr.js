const { decodeAddress, encodeAddress } = require("@polkadot/util-crypto")
const { u8aToHex } = require("@polkadot/util")

const u8 = decodeAddress("ESgz7GLVW7BL5DhRgpVnxSXVwaKt4ytWcrf52TY1GQD1cEb")
console.log(u8aToHex(u8))
const dotAddress = encodeAddress(u8, 0)
console.log('dot', dotAddress)
const ksmAddress = encodeAddress(u8, 2)
console.log('ksm', ksmAddress)
