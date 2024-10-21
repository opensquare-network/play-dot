const { getApi } = require("./api");
const { findBlockApiByHeight } = require("../common/blockHash");

(async () => {
  const api = await getApi();
  const blockApi = await findBlockApiByHeight(	100988, api);
  const storage = await blockApi.query.broker.saleInfo();
  console.log(storage.toJSON());

  process.exit(0);
})();
