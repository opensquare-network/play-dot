const BigNumber = require("bignumber.js");

const BNCS = 1_000_000_000_000;
const DOLLARS = BNCS;
const CENTS = DOLLARS / 100; // assume this is worth about a cent.

function deposit(items, bytes) {
  const v1 = new BigNumber(items).times(15).times(CENTS);
  const v2 = new BigNumber(bytes).times(6).times(CENTS);
  return v1.plus(v2).toString();
}

const preimageBaseDeposit = deposit(2, 64);
const preimageByteDeposit = deposit(0, 1);

console.log("base", preimageBaseDeposit / Math.pow(10, 12));
console.log("byte", preimageByteDeposit / Math.pow(10, 12));

function convert(footPrint, decimals = 12) {
  const { count, size } = footPrint;
  const s = count * size;

  return new BigNumber(s).times(preimageByteDeposit).plus(preimageBaseDeposit).dividedBy(Math.pow(10, decimals)).toString();
}

(() => {
  console.log(convert({ count: 1, size: 277 }));
})()
