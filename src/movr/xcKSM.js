const { ethers } = require("ethers")
const { erc20Abi } = require("./abi");
const { httpProvider: provider } = require("./provider");

;(async function testXcKSM() {
  const contract = "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080";

  const erc20 = new ethers.Contract(contract, erc20Abi, provider);
  const tokenName = await erc20.symbol();
  const decimals = await erc20.decimals();

  console.log(`${ tokenName } decimals`, decimals);
  process.exit(0);
})();
