const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  // const height = 5641319;
  const height = 5641149;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const unsub = await blockApi.query.democracy.referendumInfoOf(11, info => {
    console.log('info', info.toJSON());
  });

  console.log(unsub);
})();
