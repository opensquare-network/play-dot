// todo: 1. convert function
const BigNumber = require("bignumber.js");

const units = 10_000_000_000;
const DOLLARS = units; // 10_000_000_000
const CENTS = DOLLARS / 100; // 100_000_000
const MILLICENTS = CENTS / 1_000; // 100_000

function deposit(items, bytes) {
  const v1 = new BigNumber(items).times(20).times(DOLLARS);
  const v2 = new BigNumber(bytes).times(100).times(MILLICENTS);
  return v1.plus(v2).toString();
}

const preimageBaseDeposit = deposit(2, 64);
const preimageByteDeposit = deposit(0, 1);

function convert(footPrint, decimals = 10) {
  const { count, size } = footPrint;
  const s = count * size;

  return new BigNumber(s).times(preimageByteDeposit).plus(preimageBaseDeposit).dividedBy(Math.pow(10, decimals)).toString();
}

function relay() {
  console.log("base", preimageBaseDeposit / Math.pow(10, 10));
  console.log("byte", preimageByteDeposit / Math.pow(10, 10));
  const footPrint = { count: 1, size: 60 };
  console.log(convert(footPrint));
}

function para() {
  console.log("base", preimageBaseDeposit / 100 / Math.pow(10, 10));
  console.log("byte", preimageByteDeposit / 100 / Math.pow(10, 10));
  const footPrint = { count: 1, size: 41 };
  console.log(convert(footPrint, 12));
}

(() => {
  relay()
})();
