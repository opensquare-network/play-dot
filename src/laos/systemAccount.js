const { getApi } = require("./api");
const BigNumber = require("bignumber.js");

function calcTransferable(info, existentialDeposit) {
  const { free, frozen, reserved } = info;
  const frozenReserveDif = new BigNumber(frozen).minus(reserved);
  const noZeroConsidered = new BigNumber(free || 0)
    .minus(BigNumber.max(frozenReserveDif, existentialDeposit))
    .toString();
  return BigNumber.max(noZeroConsidered, 0).toString();
}

(async () => {
  const api = await getApi();
  const address = "0x9E5F93A05F9Da3bEA22fA342299b0575bF5350c3";

  const rawAccount = await api.query.system.account(address);
  const trans = calcTransferable(rawAccount.data.toJSON(), 0);
  console.log(rawAccount.data.free.toString(), trans);

  process.exit(0);
})();
