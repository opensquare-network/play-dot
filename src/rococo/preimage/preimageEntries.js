const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const entries = await api.query.preimage.preimageFor.entries();
  for (const [storageKey, rawPreimage] of entries) {
    const key = storageKey.args[0];
    const hash = key[0].toString();
    const len = key[1].toNumber();
    try {
      const proposal = api.registry.createType("Proposal", rawPreimage.unwrap());
      const verifyHash = proposal.hash.toString();
      console.log("hash", hash, "len", len, "verify hash", verifyHash);
    } catch (e) {
      console.log("hash", hash, "len", len, "invalid preimage");
    }
  }

  process.exit(0);
})();
