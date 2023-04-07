const { getApi } = require("../api");

function getAddress(storageKey, api) {
  let pubKeyU8a;
  if (storageKey.length === 72) {
    pubKeyU8a = storageKey.slice(40);
  }
  if (!pubKeyU8a) {
    throw new Error(`Unexpected storage key length ${ storageKey.length }`)
  }

  const accountId = api.registry.createType("AccountId", pubKeyU8a);
  return accountId.toString();
}

;(async () => {
  const api = await getApi();
  const voting = await api.query.democracy.votingOf.entries();
  const allDelegations = voting.filter(item => item[1].isDelegating);
  // todo: find all delegations

  const target = "D2r9AudNkHHpKfGtS5rpVHkchBoBhRsR6TmNcTuU4yiTp6w";
  const targets = allDelegations.filter(([who, value]) => {
    const delegating = value.asDelegating;
    const delegatingTarget = delegating.target.toString();
    return delegatingTarget === target;
  })

  const allDelegators = targets.map(([who]) => getAddress(who, api));

  console.log(allDelegators);
})();
