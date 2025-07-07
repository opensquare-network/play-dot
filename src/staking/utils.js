const ONE = Math.pow(10, 9);
const BigNumber = require("bignumber.js");

function perbillFromRational(numerator, denominator) {
  return BigInt(numerator) * BigInt(ONE) / BigInt(denominator);
}

function calcWithPerbill(value, perbill) {
  return BigInt(value) * perbill / BigInt(ONE);
}

function oneMinusPerbill(commission) {
  return BigInt(ONE) - BigInt(commission);
}

function perbillMul(a, b) {
  return a * b / BigInt(ONE);
}

module.exports = {
  perbillFromRational,
  calcWithPerbill,
  oneMinusPerbill,
  perbillMul,
}
