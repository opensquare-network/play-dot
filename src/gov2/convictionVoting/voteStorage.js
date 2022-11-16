const { getApi } = require("../api");
const { encodeAddress } = require("@polkadot/util-crypto")

function extractInfo(storageKey = []) {
  const sectionRemoved = storageKey.slice(32);
  const accountHashRemoved = sectionRemoved.slice(8);
  const accountU8a = accountHashRemoved.slice(0, 32);

  const accountRemoved = accountHashRemoved.slice(32);
  const classIdU8a = accountRemoved.slice(8);

  return {
    accountU8a,
    classIdU8a,
  }
}

function extractAccountVote(vote) {
  if (!vote.isStandard) {
    // fixme: we are ignoring split vote
    return
  }

  const standard = vote.asStandard;
  const balance = standard.balance.toString();
  const aye = standard.vote.isAye;
  const conviction = standard.vote.conviction.toNumber();

  console.log(`\tbalance: ${ balance }`)
  console.log(`\taye: ${ aye }`)
  console.log(`\tconviction: ${ conviction }`)
}

function extractCasting(votingOf) {
  if (!votingOf.isCasting) {
    return
  }

  const casting = votingOf.asCasting;
  for (const [pollIndex, accountVote] of casting.votes) {
    console.log('\tPoll index:', pollIndex.toNumber());
    extractAccountVote(accountVote);
  }
}

function extractDelegation(votingOf) {
  if (!votingOf.isDelegating) {
    return
  }

  const delegating = votingOf.asDelegating;

}

;(async () => {
  const api = await getApi();
  const entries = await api.query.convictionVoting.votingFor.entries();
  for (const [storageKey, votingOf] of entries) {
    const { accountU8a, classIdU8a } = extractInfo(storageKey);
    const address = encodeAddress(accountU8a, api.registry.chainSS58);
    const trackId = api.registry.createType('U16', classIdU8a).toNumber();
    console.log("address:", address, "trackId", trackId);
    extractCasting(votingOf);
  }

  process.exit(0)
})();
