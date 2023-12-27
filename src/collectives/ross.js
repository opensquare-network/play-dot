const { getApi } = require("./api");

async function hasRoss(height) {
  const ross = "1hYiMW8KSfUYChzCQSPGXvMSyKVqmyvMXqohjKr3oU5PCXF";
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  if (!blockApi.query.fellowshipCollective?.members) {
    return false;
  }
  const entries = await blockApi.query.fellowshipCollective.members.entries();
  const members = [];
  for (const [storageKey, memberStatus] of entries) {
    const member = storageKey.args[0].toString();
    members.push(member);
  }

  return members.find(m => m === ross);
}

;(async () => {
  // const has = await hasRoss(2785033);
  let start = 1000000;
  let end = 2842615;

  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    let has = await hasRoss(middle);
    if (has) {
      end = middle;
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  console.log("start", start, "end", end);
  process.exit(0);
})();
