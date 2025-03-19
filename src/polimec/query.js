const { getCommonApi } = require("../common/api");
(async () => {
  const api = await getCommonApi("wss://polimec.rpc.amforc.com/");
  const asset = await api.query.foreignAssets.asset({
    "parents": 1,
    "interior": {
      "x3": [
        {
          "parachain": 1000
        },
        {
          "palletInstance": 50
        },
        {
          "generalIndex": 1337
        }
      ]
    }
  });

  console.log(asset);
  process.exit(0);
})();
