const { getApi } = require("../api");
const { bigAdd } = require("../../util/bigAdd");
const { u8aToHex } = require("@polkadot/util");

async function queryEntries(api, startKey, num = 1000) {
  return api.query.escrow.locked.entriesPaged({
    args: [],
    pageSize: num,
    startKey,
  });
}

;(async () => {
  const api = await getApi();
  let startKey = null;

  let totalStaked = 0;
  let notEndStaked = 0;
  let addrCount = 0;
  let entries = await queryEntries(api, startKey, 1000);
  while (entries.length > 0) {
    addrCount += entries.length;
    for (const [storageKey, lockedBalance] of entries) {
      const balance = lockedBalance.amount.toString();
      totalStaked = bigAdd(totalStaked, balance);
      notEndStaked = bigAdd(notEndStaked, balance);
    }

    startKey = u8aToHex(entries[entries.length - 1][0]);
    entries = await queryEntries(api, startKey, 1000);
  }
  console.log("addrCount", addrCount, "totalStaked", totalStaked, "notEndStaked", notEndStaked);

  process.exit(0);
})();
