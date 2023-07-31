const { getApi } = require("./interlay-api");
const {stringToU8a} = require("@polkadot/util");

;(async () => {
  const api = await getApi();
  const trsry = "modlpy/trsry";
  const accountId = api.registry.createType("AccountId", stringToU8a(trsry.padEnd(32, '\0')));

  console.log(accountId.toString());
})();
