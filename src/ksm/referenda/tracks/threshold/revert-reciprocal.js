const BigNumber = require("bignumber.js");

const multiplier = Math.pow(10, 9);

function revertReciprocal(factor, xOffset, yOffset) {
  return function (y) {
    const denominator = new BigNumber(y).minus(yOffset);
    const v = new BigNumber(factor).multipliedBy(multiplier).div(denominator);
    return v.minus(xOffset).toString()
  }
}

;(async () => {
  const generalAdmin = revertReciprocal(222222224, 333333335, 333333332);
  const value = generalAdmin(0.6 * multiplier);

  console.log(value)
  console.log(new BigNumber(value).div(Math.pow(10, 9)).toString());
  process.exit(0);
})()
