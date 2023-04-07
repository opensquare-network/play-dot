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

  const value = allDelegations.map(([who, value]) => {
    const delegator = getAddress(who, api);
    const delegating = value.asDelegating;
    const delegatee = delegating.target.toString();
    const balance = delegating.balance.toString();
    return {
      delegator,
      delegatee,
      balance,
    }
  });

  console.log(value);
})();
