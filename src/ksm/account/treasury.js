const { getApi } = require("../api");
const {
  stringToU8a,
} = require("@polkadot/util");

;(async () => {
  const api = await getApi();
  const prefix = "modlpy/trsry";
  const test = api.registry.createType(
    "AccountId",
    stringToU8a(prefix.padEnd(32, "\0")),
  );

  console.log(test.toString());
  process.exit(0);
})();
