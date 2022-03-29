const { ethers } = require("ethers")

const signature = {
  "address": "0x61197065b4fb6a7c685588fb09abd27cae27fbc0",
  "msg": "0x68656c6c6f",
  "sig": "92caba749cb9721d44a201d4408d92a61f587eac7e560f48b6d49a30aa422d201e2193a20e208919186355d249464802ed3b78a40cbcb59e0682dd5c236def881b",
  "version": "3",
  "signer": "MEW"
};

const result = ethers.utils.verifyMessage("hello", `0x${signature.sig}`)

console.log(result)
