const { getApi } = require("../api");
const { consoleEntries } = require("./entries");

;(async () => {
  const api = await getApi();

  const entries = await api?.query?.vesting?.vesting.entries();
  consoleEntries(entries);

  process.exit(0);
})();
