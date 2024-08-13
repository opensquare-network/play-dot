require("dotenv").config();
const ethers = require('ethers');
const wallet = ethers.Wallet.fromMnemonic(process.env.mnemonic);

console.log("address:", wallet.address);

console.log(wallet);
