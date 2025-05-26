const { getCommonApi } = require("../../common/api");

(async () => {
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  const entries = await api.query.childBounties.v0ToV1ChildBountyIds.entries();
  for (const [key, optionalValue] of entries) {
    const v0Index = key.args[0].toNumber();
    const v1 = optionalValue.toJSON();
    console.log(v0Index, v1);
  }

  process.exit(0);
})();
