// votingFor storage: (account, votingOf)
// key u8a[] composition: section + method = 32; account twox64 hash = 8, account = 32;
function normalizeVotingOfEntry([storageKey, voting], blockApi) {
  let pubKeyU8a;
  if (storageKey.length === 72) {
    pubKeyU8a = storageKey.slice(40);
  }
  if (!pubKeyU8a) {
    throw new Error(`Unexpected storage key length ${ storageKey.length }`);
  }

  const accountId = blockApi.registry.createType("AccountId", pubKeyU8a);
  const account = accountId.toString();
  return { account, voting };
}

module.exports = {
  normalizeVotingOfEntry,
}
