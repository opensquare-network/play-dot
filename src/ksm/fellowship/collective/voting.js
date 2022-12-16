const { extractPollIndexAndAddress } = require("./voting/key");
const { getApi } = require("../../api");

function normalizeVotingRecord(optionalRecord) {
  if (!optionalRecord.isSome) {
    return null;
  }

  const record = optionalRecord.unwrap();
  const isAye = record.isAye;
  const votes = isAye ? record.asAye.toNumber() : record.asNay.toNumber();
  return {
    isAye,
    votes,
  }
}

;(async () => {
  const api = await getApi();
  const height = 15602369;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const voting = await blockApi.query.fellowshipCollective.voting.entries();

  const normalized = [];
  for (const [storageKey, votingOf] of voting) {
    const { pollIndex, address } = extractPollIndexAndAddress(storageKey, api);
    const vote = normalizeVotingRecord(votingOf);
    if (vote) {
      normalized.push({
        pollIndex,
        address,
        ...vote,
      });
    }
  }

  console.log(normalized);

  process.exit(0);
})()
