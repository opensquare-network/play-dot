const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const address = "7KATdGbUTAwiuA7f447boHv4eTHT3TF8qoWBW2GpLVdT3gkH";
  const account = await api.query.system.account(address);
  const rawEntries = await api.query.tokens.accounts.entries(address);
  for (const [storageKey, value] of rawEntries) {
    const account = storageKey.args[0].toString();
    const assetId = storageKey.args[1].toNumber();
    console.log("account", account, "assetId", assetId, "value", value.toJSON());
  }
  console.log("system account", account.toJSON());
  process.exit(0);
})();
