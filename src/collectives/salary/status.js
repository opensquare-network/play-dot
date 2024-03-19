const { getApi } = require("../api");

async function entries() {
  const api = await getApi();
  const entries = await api?.query?.fellowshipSalary?.claimant.entries();
  for (const [storageKey, record] of entries) {
    const claimant = storageKey.args[0].toString();
    const status = record.toJSON();
    console.log("claimant", claimant, "status", status);
  }
}

;(async () => {
  await entries();
  // await query();

  process.exit(0);
})();
