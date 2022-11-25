const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const perbill = api.registry.createType("Perbill", 3_000_000_000);

  console.log(perbill.toHuman());
  process.exit(0);
})();
