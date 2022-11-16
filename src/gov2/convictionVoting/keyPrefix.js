const { xxhashAsU8a, xxhashAsHex } = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

const section = xxhashAsU8a("ConvictionVoting", 128);
const method = xxhashAsU8a("VotingFor", 128);

const xxU8a = xxhashAsU8a("0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d")

const xxHex = u8aToHex(xxU8a)

const hex = u8aToHex(new Uint8Array([...section, ...method]));
console.log(hex)
