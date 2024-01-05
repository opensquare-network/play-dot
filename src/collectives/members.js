const { getApi } = require("./api");

async function entries() {
  const api = await getApi();
  const entries = await api?.query?.fellowshipCollective?.members.entries();
  for (const [storageKey, record] of entries) {
    const member = storageKey.args[0].toString();
    const status = record.toJSON();
    console.log("member", member, "status", status);
  }
}

;(async () => {
  await entries();
  // await query();

  process.exit(0);
})();
