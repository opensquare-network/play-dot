const { getApi } = require("../api");

;(async () => {
  const height = 4000000;
  const api = await getApi();

  process.exit(0);
})();
