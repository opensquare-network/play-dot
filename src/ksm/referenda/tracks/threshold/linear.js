const BigNumber = require("bignumber.js");

function linear(length, floor, ceil) {
  return function (x) {
    const xValue = BigNumber.min(x, length);
    const slope = new BigNumber(ceil).minus(floor).dividedBy(length);
    const deducted = slope.multipliedBy(xValue).toString();

    return new BigNumber(ceil).minus(deducted).toFixed(0, BigNumber.ROUND_DOWN);
  }
}

;(() => {
  const testX = 1 / 672 * Math.pow(10, 9);
  console.log("testX", testX);
  const treasurer = linear(1000000000, 0, 500000000);
  const value = treasurer(testX);

  console.log(value)
  console.log(new BigNumber(value).div(Math.pow(10, 9)).toString());
})();
