const { getApi } = require("./api");

async function entries() {
  const api = await getApi();
  const entries = await api?.query?.fellowshipCore?.memberEvidence.entries();
  for (const [storageKey, storageValue] of entries) {
    console.log(storageKey, storageValue);
  }
}

;(async () => {
  await entries();

  process.exit(0);
})();
