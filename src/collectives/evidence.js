const { getApi } = require("./api");

async function entries() {
  const api = await getApi();
  const entries = await api?.query?.fellowshipCore?.memberEvidence.entries();
  for (const [storageKey, optionalStorage] of entries) {
    const address = storageKey.args[0].toString();
    let evidence, wish;
    if (optionalStorage.isSome) {
      const storage = optionalStorage.unwrap();
      wish = storage[0].toString();
      evidence = storage[1].toJSON();
    } else {
      wish = null;
      evidence = null;
    }

    console.log(address, wish, evidence);
  }
}

;(async () => {
  await entries();

  process.exit(0);
})();
