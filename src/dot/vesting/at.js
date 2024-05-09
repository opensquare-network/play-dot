const { getApi } = require("../api");
const { findBlockApiByHeight } = require("../../common/blockHash");
const { consoleEntries } = require("./entries");

;(async () => {
  const api = await getApi();

  const height = 900;
  const blockApi = await findBlockApiByHeight(height, api);
  const entries = await blockApi?.query?.vesting?.vesting.entries();
  consoleEntries(entries);

  process.exit(0);
})();
