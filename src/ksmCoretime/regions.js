const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const rawEntries = await api.query.broker.regions.entries();
  for (const [storageKey, rawRegion] of rawEntries) {
    const regionId = storageKey.args[0].toJSON();
    const region = rawRegion.toJSON();
    console.log("regionId", regionId, "region", region);
  }

  process.exit(0);
})();
