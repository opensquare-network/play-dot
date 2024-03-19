const { getApi } = require("../api");
const BigNumber = require("bignumber.js");

function normalizeCfg(value) {
  const decimals = 18;
  return new BigNumber(value).div(Math.pow(10, decimals)).toString();
}

;(async () => {
  const api = await getApi();
  const issuance = await api.query.balances.totalIssuance();

  const bridgeAccount = "4dpEcgqFp8UL6eA3b7hhtdj7qftHRZE7g1uadHyuw1WSNSgH";
  const wcfgAccount = await api.query.system.account(bridgeAccount);
  const { free, reserved } = wcfgAccount.data;
  const wcfg = new BigNumber(free.toString()).plus(reserved.toString()).toString();
  console.log(`cfg wrapped ${ normalizeCfg(wcfg) }`)

  console.log(`cfg issuance ${ normalizeCfg(issuance.toString()) }`);

  const nativeCfg = new BigNumber(issuance.toString()).minus(wcfg).toString();
  console.log(`native cfg ${ normalizeCfg(nativeCfg) }`);

  process.exit(0);
})();
