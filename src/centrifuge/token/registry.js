const { getApi } = require("../api");

;(async () => {
  const api = await getApi();

  const entries = await api.query.ormlAssetRegistry.metadata.entries();
  for (const [storageKey, optionalMetadata] of entries) {
    const keyArg = storageKey.args[0];
    if (keyArg.isForeignAsset) {
      const asset = keyArg.asForeignAsset;
      const metadata = optionalMetadata.unwrap();
      console.log(`foreign asset id ${ asset.toJSON() }, name ${ metadata.name.toHuman() }, symbol ${ metadata.symbol.toHuman() }`);
    }
  }

  process.exit(0);
})();
