const { getApi } = require("../api");
const { logRawStatus } = require("./common");

;(async () => {
  const api = await getApi();
  const entries = await api.query.preimage.requestStatusFor.entries();
  for (const [storageKey, rawStatus] of entries) {
    const hash = storageKey.args[0].toString();
    logRawStatus(rawStatus, hash);
  }

  process.exit(0);
})();
