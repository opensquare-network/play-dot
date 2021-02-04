const { decodeAddress, encodeAddress } = require("@polkadot/util-crypto")
const { u8aToHex } = require("@polkadot/util")
const { all } = require("@polkadot/networks")

const ksmPrefix = all.find(({ network }) => network === 'kusama').prefix
const dotPrefix = all.find(({ network }) => network === 'polkadot').prefix

const u8 = decodeAddress("ESgz7GLVW7BL5DhRgpVnxSXVwaKt4ytWcrf52TY1GQD1cEb")
console.log(u8aToHex(u8))
const dotAddress = encodeAddress(u8, dotPrefix)
console.log('dot', dotAddress)
const ksmAddress = encodeAddress(u8, ksmPrefix)
console.log('ksm', ksmAddress)
