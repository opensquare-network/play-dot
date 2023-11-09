const { getKarApi } = require("./api");
;(async () => {
  const api = await getKarApi();
  const blockHash = await api.rpc.chain.getBlockHash(89001);
  const blockApi = await api.at(blockHash);

  const raw = await blockApi.query.tips.tips("0xc2851d861936fc5e3239fb90b1bdd2b2c2ca2e8823fff145468cf19bc0148740");
  console.log(raw.toJSON());
  process.exit(0);
})();
