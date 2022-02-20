const { ethers } = require("ethers")
const testMovrAddress = '0xB9b8EF61b7851276B0239757A039d54a23804CBb';

;(async () => {
  console.log(ethers.utils.isAddress(testMovrAddress));
})()
