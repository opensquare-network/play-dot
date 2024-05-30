const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const entries = await api.query.assetRate.conversionRateToNative.entries();
  for (const [storageKey, rate] of entries) {
    console.log("storageKey", storageKey.args[0].toJSON());
    console.log("rate", rate.toJSON());
  }

  process.exit(0);
})();
