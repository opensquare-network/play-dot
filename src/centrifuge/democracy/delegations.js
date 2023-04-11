const { getApi } = require("../api");
const BigNumber = require("bignumber.js");

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

  const delegatedMap = {};

  const value = allDelegations.map(([who, value]) => {
    const delegator = getAddress(who, api);
    const delegating = value.asDelegating;
    const delegatee = delegating.target.toString();
    const balance = delegating.balance.toString();

    const delegated = delegatedMap[delegatee];
    if (delegated) {
      delegatedMap[delegatee] = new BigNumber(delegated).plus(balance).div(Math.pow(10, 18)).toString();
    } else {
      delegatedMap[delegatee] = new BigNumber(balance).div(Math.pow(10, 18)).toString();
    }

    return {
      delegator,
      delegatee,
      balance,
    }
  });
  // console.log(value);

  const delegatedArr = Object.entries(delegatedMap).map(([address, value]) => {
    return {
      address,
      value,
    }
  });

  // calc ranked 
  delegatedArr.sort(({ value: a }, { value: b }) => {
    return new BigNumber(b).gt(a) ? 1 : -1;
  })
  console.log(delegatedArr);

  process.exit(0);
})();
