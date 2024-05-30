const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const entries = await api.query.assetRate.conversionRateToNative.entries();
  for (const [storageKey, rate] of entries) {
    console.log("storageKey", JSON.stringify(storageKey.args[0].toJSON(), null, 2));
    console.log("rate", rate.toJSON());
    console.log("***************************************")
  }

  process.exit(0);
})();
