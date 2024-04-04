const { getApi } = require("../api");
const { getAssetAccountStorageKey } = require("./key");

;(async () => {
  const api = await getApi();
  const account = "16ZL8yLyXv3V3L3z9ofR1ovFLziyXaN1DPq4yffMAZ9czzBD";
  const assetId = 30;

  const key = getAssetAccountStorageKey(assetId, account, api.registry);
  const storageArray = await api.rpc.state.queryStorageAt([key]);
  const storage = storageArray[0];
  let info = api.registry.createType("AssetBalance", storage.toHex(), true);
  console.log(info.toJSON())
  let info2 = api.registry.createType("PalletAssetsAssetAccount", storage.toHex(), true);
  console.log(info2.toJSON());

  console.log(key);
  process.exit(0);
})();
