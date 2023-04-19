const { findBlockApiByHeight } = require("../../../../common/blockHash");
const { getApi } = require("../../../api");

;(async () => {
  const referendumIndex = 0;
  const height = 56181;

  const api = await getApi();
  const blockApi = await findBlockApiByHeight(height, api);
  const preBlockApi = await findBlockApiByHeight(height - 1, api);
  const referendumInfo = await preBlockApi.query.democracy.referendumInfoOf(referendumIndex);

  process.exit(0);
})()
