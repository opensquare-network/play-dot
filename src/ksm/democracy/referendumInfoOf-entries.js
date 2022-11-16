const { getApi } = require("../api");

;(async () => {
  const api = await getApi();

  const entries = await api.query.democracy.referendumInfoOf.entries();
  // const voters = await blockApi.query.democracy.votersFor(0);
  for (const [storageKey] of entries) {
    console.log(storageKey.toString());
  }

  const idx = api.registry.createType('ReferendumIndex', 0xbe000000);
  console.log(idx);

  process.exit(0);
})();

// const key = "0xf2794c22e353e9a839f12faab03a911bb9e0c7dac4238b700a83735192cb921cfb4eac7c31e48cf5be000000"
