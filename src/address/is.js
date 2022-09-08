const { isAddress, cryptoWaitReady } = require("@polkadot/util-crypto");
const { ethers } = require("ethers")
const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');

const isEvm = ethers.utils.isAddress("5D5eMuYPwZ6NbK1oHCre69G7rhYHRNMtNaepAd2eBPfDAzwo")

const is = isAddress("0x61197065B4Fb6a7C685588fB09ABd27CAe27fBC0");

const str = "0xfab1939ef8b0dee89a3b6d3a927d4f799baf949e8fa679637dc14c2c570f2e20822152002ed79d29f46945c909c0e34341caed712141e5c934d8229e6932d0d81cf0afb5532ba254912c1c8ad739a3e7f5325c24409801706c391d337e93ffffefcbfdec0806617572612061a83a0800000000056175726101013c14afd18f5c58c22920e08c010edf603ce05b3de64edd92b920daec26b5734ee026c33e25b471a724302bd04941b88f8eb7d55fdae00e11df405988e2168485";

const isValidAddressPolkadotAddress = (address) => {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );

    return true;
  } catch (error) {
    return false;
  }
};


;(async () => {
  await cryptoWaitReady();

  const isValid = isValidAddressPolkadotAddress(str);
  console.log(isValid);

})();
console.log(is)
