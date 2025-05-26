const BigNumber = require("bignumber.js");
const UNITS = 1_000_000_000_000;
const QUID = UNITS / 30;
const CENTS = QUID / 100;
const MILLICENTS = CENTS / 1_000;

function deposit(items, bytes) {
  return items * 2_000 * CENTS + bytes * 100 * MILLICENTS;
}

const preimageBaseDeposit = Math.trunc(deposit(2, 64));
const preimageByteDeposit = Math.trunc(deposit(0, 1));

function convert(footPrint, decimals = 12) {
  const { count, size } = footPrint;
  const s = count * size;

  return new BigNumber(s).times(preimageByteDeposit).plus(preimageBaseDeposit).dividedBy(Math.pow(10, decimals)).toString();
}

function relay() {
  console.log("base", Math.trunc(preimageBaseDeposit)
    // / Math.pow(10, 12)
  );
  console.log("byte", preimageByteDeposit
    // / Math.pow(10, 12)
  );

  const footPrint = { count: 1, size: 34 };
  console.log(convert(footPrint));
}

(() => {
  relay()
})();
