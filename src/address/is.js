const { isAddress } = require("@polkadot/util-crypto");
const { ethers } = require("ethers")

const isEvm = ethers.utils.isAddress("5D5eMuYPwZ6NbK1oHCre69G7rhYHRNMtNaepAd2eBPfDAzwo")

const is = isAddress("0x61197065B4Fb6a7C685588fB09ABd27CAe27fBC0");

console.log(is)
