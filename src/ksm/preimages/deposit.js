function formatNum(v) {
  return Math.floor(v);
}

const BigNumber = require("bignumber.js");
const UNITS = 1_000_000_000_000;
const QUID = formatNum(UNITS / 30);
const CENTS = formatNum(QUID / 100);
const MILLICENTS = formatNum(CENTS / 1_000);

console.log(QUID, CENTS, MILLICENTS);

function deposit(items, bytes) {
  return items * 2_000 * CENTS + bytes * 100 * MILLICENTS;
}

const preimageBaseDeposit = deposit(2, 64);
const preimageByteDeposit = deposit(0, 1);

function convert(footPrint, decimals = 12) {
  const { count, size } = footPrint;
  const s = count * size;

  return new BigNumber(s).times(preimageByteDeposit).plus(preimageBaseDeposit).dividedBy(Math.pow(10, decimals)).toString();
}

function relay() {
  console.log("base", preimageBaseDeposit
    // / Math.pow(10, 12)
  );
  console.log("byte", preimageByteDeposit
    // / Math.pow(10, 12)
  );

  const footPrint = { count: 1, size: 320 };
  console.log(convert(footPrint));
}

(() => {
  relay()
})();
