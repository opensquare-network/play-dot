const { getCommonApi } = require("../../common/api");
const { findBlockApiByHeight } = require("../../common/blockHash");

(async () => {
  const api = await getCommonApi("wss://sys.ibp.network/asset-hub-paseo");
  const blockApi = await findBlockApiByHeight(1, api);
  const entries = await blockApi.query.assets.asset.entries();
  for (const [storageKey, optionalAsset] of entries) {
    const assetId = storageKey.args[0].toNumber();
    const unwrapped = optionalAsset.unwrap();
    const asset = unwrapped.toJSON();

    const metadata = await api.query.assets.metadata(assetId);
    if (metadata) {
      const name = metadata.name.toHuman();
      const symbol = metadata.symbol.toHuman();
      console.log(assetId, symbol, name);
    }
  }

  process.exit(0);
})();
