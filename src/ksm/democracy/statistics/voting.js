const { sortVotesWithConviction, LOCKS } = require("./sort");
const { extractDelegations } = require("./delegation");
const { extractDirectVotes } = require("./standard");
const { normalizeVotingOfEntry } = require("./normalizeEntry");
const { getApi } = require("../../api");
const BigNumber = require("bignumber.js");

;(async () => {
  const referendumIndex = 234;
  // const referendumIndex = 43;

  const api = await getApi();
  const height = 14720558;
  // const height = 1713600;
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const preBlockHash = await api.rpc.chain.getBlockHash(height - 1);
  const preBlockApi = await api.at(preBlockHash);
  const referendumInfo = await preBlockApi.query.democracy.referendumInfoOf(referendumIndex);
  const onGoing = referendumInfo.unwrap().asOngoing;
  const aye = onGoing.tally.ayes.toBigInt().toString();
  const nay = onGoing.tally.nays.toBigInt().toString();
  console.log("aye", aye, "nay", nay);

  const blockApi = await api.at(blockHash);
  const voting = await blockApi.query.democracy.votingOf.entries();
  const normalized = voting.map((item) => normalizeVotingOfEntry(item, blockApi));
  const directVotes = extractDirectVotes(normalized, referendumIndex);
  const delegations = extractDelegations(normalized, directVotes);

  const sorted = sortVotesWithConviction([...directVotes, ...delegations]);
  const allAye = sorted.filter((v) => v.aye);
  const allNay = sorted.filter((v) => !v.aye);

  const ayeValue = allAye.reduce((result, item) => {
    const balance = new BigNumber(item.balance).multipliedBy(LOCKS[item.conviction])
      .div(10).toFixed(0, 1);

    return new BigNumber(result).plus(balance).toFixed();
  }, 0);
  const nayValue = allNay.reduce((result, item) => {
    const balance = new BigNumber(item.balance).multipliedBy(LOCKS[item.conviction])
      .div(10).toFixed(0, 1);

    return new BigNumber(result).plus(balance).toString();
  }, 0);

  console.log("aye", aye, "ayeValue", ayeValue);
  console.log("nay", nay, "nayValue", nayValue);

  if (aye === ayeValue) {
    console.log("Aye value match");
  }
  if (nay === nayValue) {
    console.log("Nay value match");
  }

  process.exit(0);
})();
