const BigNumber = require("bignumber.js");
const UNITS = 1_000_000_000_000;
const DOLLARS = UNITS * 100; // 100 UNITS ~= 1 $
const CENTS = DOLLARS / 100; // 1 UNITS ~= 1 cent
const MILLICENTS = CENTS / 1_000;

function deposit(items, bytes) {
  const v1 = new BigNumber(items).times(2).times(DOLLARS);
  const v2 = new BigNumber(bytes).times(30).times(MILLICENTS);
  return v1.plus(v2).toString();
}

const preimageBaseDeposit = deposit(2, 64);
const preimageByteDeposit = deposit(0, 1);
const decimals = 12;

function calc(byteLen) {
  const byteDeposit = new BigNumber(byteLen).times(preimageByteDeposit).toString();
  return new BigNumber(preimageBaseDeposit).plus(byteDeposit).div(Math.pow(10, decimals)).toString();
}

(() => {
  console.log(calc(8));
})();
