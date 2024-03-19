const { getApi } = require("../api");
const { u8aToHex } = require("@polkadot/util");

const queryCount = 1000;

async function queryEntries(api, startKey, num = 1000) {
  return api.query.system.account.entriesPaged({
    args: [],
    pageSize: num,
    startKey,
  });
}

;(async () => {
  const api = await getApi();

  let total = 0;
  let gt0Total = 0;
  let startKey = null;
  let entries = await queryEntries(api, startKey, queryCount);
  while (entries.length > 0) {
    const filtered = entries.filter(entry => {
      const { data: { free, reserved } } = entry[1];
      return free.gt(0) || reserved.gt(0);
    });
    total += entries.length;
    gt0Total += filtered.length;

    startKey = u8aToHex(entries[entries.length - 1][0]);
    entries = await queryEntries(api, startKey, queryCount);
    console.log(`${ total }, ${ gt0Total }`);
  }

  console.log(`account updated, total ${ total }, gt0 ${ gt0Total }`);
  process.exit(0);
})();
