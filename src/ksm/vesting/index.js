const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  // const height = 1699967;
  const height = 1377830; // 1377831 突然有一堆vesting出现
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const account = "HChjf62FddBkgfkYMr5E2ejjAeRNEsXDZC677JKgMhxeBBW";
  const v = await blockApi.query.vesting.vesting(account);
  const json = v.toJSON();
  console.log(v);
})();
