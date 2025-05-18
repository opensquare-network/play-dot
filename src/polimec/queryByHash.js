const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://polimec.rpc.amforc.com/");
  const asset = await api.query.foreignAssets.asset("0x7dadc06a974252e2a81cf01a760b2b7dc3656ae8ea7f78a03e55bb72771a0032");

  console.log(asset);
  process.exit(0);
})();
