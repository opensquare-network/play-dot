const BigNumber = require("bignumber.js");

function reciprocal(factor, xOffset, yOffset) {
  return function(x) {
    const v = new BigNumber(factor)
      .div(new BigNumber(x).plus(xOffset))
      .multipliedBy(Math.pow(10, 9)).toFixed(0, BigNumber.ROUND_DOWN);

    return new BigNumber(v).plus(yOffset).toString();
  }
}

;(async () => {
  const testX = 336 / 672 * Math.pow(10, 9);
  const generalAdmin = reciprocal(222222224, 333333335, 333333332);
  const value = generalAdmin(testX);

  console.log(value)
  console.log(new BigNumber(value).div(Math.pow(10, 9)).toString());
  process.exit(0);
})()
