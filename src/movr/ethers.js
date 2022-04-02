const { ethers } = require("ethers")

const { httpProvider: provider } = require("./provider")

const rmrkContractAddress = '0xffffffFF893264794d9d57E1E0E21E0042aF5A0A';
const zlkContractAddress = '0x0f47ba9d9Bde3442b42175e51d6A367928A1173B';

const testMovrAddress = '0xB9b8EF61b7851276B0239757A039d54a23804CBb';

// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

async function testErc20(contractAddress) {
  const erc20 = new ethers.Contract(contractAddress, abi, provider);
  const tokenName = await erc20.symbol();
  const decimals = await erc20.decimals();
  console.log(`${ tokenName } decimals`, decimals);

  const balance = await erc20.balanceOf(testMovrAddress, { blockTag: 1503510 })
  console.log(`${ tokenName } balance`, balance.toString(), ethers.utils.formatUnits(balance, decimals));
}

;(async () => {
  await testErc20(rmrkContractAddress)
  // const balance = await provider.getBalance("0x61197065B4Fb6a7C685588fB09ABd27CAe27fBC0")
  // console.log(balance.toString())
})()
