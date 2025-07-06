const { getCommonApi, findBlockApi } = require("../../common/api");

async function getValidators(blockApi) {
  const entries = await blockApi.query.staking.validators.entries();
  const validators = [];
  for (const [storageKey, value] of entries) {
    const validator = storageKey.args[0].toString();
    validators.push(validator);
  }

  return validators;
}

async function getElected(blockApi) {
  const elected = await blockApi.query.staking.currentElected();
  return elected.toJSON();
}

async function getBalanceByHeight(api, height, account) {
  const blockApi = await findBlockApi(api, height);
  if (blockApi.query.system?.account) {
    const rawStorage = await blockApi.query.system.account(account);
    const { free, reserved } = rawStorage.data;
    return (free.toBigInt() + reserved.toBigInt()).toString();
  } else if (blockApi.query.balances?.freeBalance) {
    const rawStorage = await blockApi.query.balances.freeBalance(account);
    return rawStorage.toBigInt().toString();
  }
}

async function getPayee(blockApi, validator) {
  const rawInfo = await blockApi.query.staking.payee(validator);
  return rawInfo.toJSON();
}

async function query(api) {
  const height = 1298690;
  const blockApi = await findBlockApi(api, height);
  // const activeEra = await blockApi.query.staking.activeEra();
  // const era = activeEra.unwrap().index.toNumber();
  const validators = await getElected(blockApi);
  for (const validator of validators) {
    // const rawExposure = await blockApi.query.staking.erasStakers(
    //   era,
    //   validators[0],
    // );
    // const json = rawExposure.toJSON();
    // if (json.others.length > 0) {
    //   console.log(json.others);
    // }

    const payee = await getPayee(blockApi, validator);
    console.log(payee);

    const now = await getBalanceByHeight(api, height, validator);
    const pre = await getBalanceByHeight(api, height - 1, validator);
    console.log(validator, "now", now, "pre", pre);
  }

  // console.log(blockApi);
}

(async () => {
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  await query(api);

  process.exit(0);
})();
