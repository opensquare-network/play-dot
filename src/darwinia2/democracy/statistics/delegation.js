const { getApi } = require("../../api");

// votingFor storage: (account, votingOf)
// key u8a[] composition: section + method = 32; account twox64 hash = 8, account = 20;
function normalizeVotingOfEntry([storageKey, voting], blockApi) {
  let pubKeyU8a;
  if (storageKey.length === 60) {
    pubKeyU8a = storageKey.slice(40);
  }
  if (!pubKeyU8a) {
    throw new Error(`Unexpected storage key length ${ storageKey.length }`);
  }

  const accountId = blockApi.registry.createType("AccountId", pubKeyU8a);
  const account = accountId.toString();
  return { account, voting };
}


(async () => {
  const api = await getApi();
  const voting = await api.query.democracy.votingOf.entries();
  const normalized = voting.map((item) => normalizeVotingOfEntry(item, api));

  console.log('voting', normalized);
  process.exit(0);
})()
