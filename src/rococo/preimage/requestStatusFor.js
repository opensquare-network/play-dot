const { getApi } = require("../api");
const { logRawStatus } = require("./common");

;(async () => {
  const api = await getApi();
  const hash = "0xace84b17a16c45f11d3192a80c7f74e236a7bf059c8d6c34b1a66e61069707ea";
  const rawStatus = await api.query.preimage.requestStatusFor(hash);
  logRawStatus(rawStatus, hash);

  process.exit(0);
})();
