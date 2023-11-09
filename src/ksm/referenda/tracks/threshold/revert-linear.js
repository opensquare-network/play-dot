const BigNumber = require("bignumber.js");

function revertLinear(length, floor, ceil) {
  return function (y) {
    const slope = new BigNumber(ceil).minus(floor).dividedBy(length);
    const deducted = new BigNumber(ceil).minus(y);
    return deducted.div(slope).toString();
  }
}

;(() => {
  const testX = 1 / 672 * Math.pow(10, 9);
  const testY = 499255952;
  const treasurer = revertLinear(1000000000, 0, 500000000);
  const value = treasurer(testY);

  console.log(value)
  console.log(new BigNumber(value).div(Math.pow(10, 9)).toString());
})();
