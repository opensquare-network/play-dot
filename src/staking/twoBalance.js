const { getCommonApi, findBlockApi } = require("../common/api");
const BigNumber = require("bignumber.js");
const { perbillFromRational, calcWithPerbill } = require("./utils");
const { bigAdd } = require("../util/bigAdd");

async function getEventTotalPayout(api) {
  const events = await api.query.system.events();
  const wrappedEvent = events[2];
  return wrappedEvent.event.data[0].toString();
}

async function getParent(blockApi) {
  const raw = await blockApi.query.staking.currentElected();
  const rawPoints = await blockApi.query.staking.currentEraPointsEarned();

  return { elected: raw.toJSON(), points: rawPoints.toJSON() };
}

function makeTuple(elected = [], individuals = []) {
  return elected.reduce((acc, elem, idx) => {
    return [...acc, { validator: elem, point: individuals[idx] || 0 }];
  }, []);
}

async function getValidatorCommission(blockApi, validator) {
  const storage = await blockApi.query.staking.validators(validator);
  return storage[0].commission.toNumber() / Math.pow(10, 9);
}

async function getTotalBalance(api, account) {
  if (api.query.system?.account) {
    const accountInfo = await api.query.system.account(account);
    return accountInfo.data.free.toString();
  }

  if (api.query.balances.freeBalance) {
    const rawBalance = await api.query.balances.freeBalance(account);
    if (rawBalance) {
      return rawBalance.toString()
    }
  }

  return 0;
}

async function getBalanceDiff(preApi, nowApi, account) {
  const nowBalance = await getTotalBalance(nowApi, account);
  const preBalance = await getTotalBalance(preApi, account);
  return new BigNumber(nowBalance).minus(preBalance).toString();
}

async function getStakersBalanceDiffSum(preApi, nowApi, validator) {
  const stakers = await nowApi.query.staking.stakers(validator);
  let sum = 0;
  for (const staker of stakers) {
    const diff = await getBalanceDiff(preApi, nowApi, validator);
    sum = bigAdd(sum, diff);
  }

  console.log(`stakers balance diff sum: ${sum}`);
  return sum;
}

(async () => {
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  const blockHeight = 29678;
  const nowApi = await findBlockApi(api, blockHeight);
  const preApi = await findBlockApi(api, blockHeight - 1);

  // todo: 1. get total payout
  // todo: 2. get elected validators and points
  // todo: 3. get Each validator share and their balance change

  const totalPayout = await getEventTotalPayout(nowApi);
  const { elected, points: { total, individual = [] } } = await getParent(preApi);

  const validatorsWithPoints = makeTuple(elected, individual);
  let sumDiff = 0;
  let sumPoint = 0;
  let expectedDiff = 0;
  for (const validatorPoint of validatorsWithPoints) {
    const { validator, point } = validatorPoint;
    const perbill = perbillFromRational(point, total);
    const validatorTotal = calcWithPerbill(totalPayout, perbill);
    expectedDiff = bigAdd(expectedDiff, validatorTotal);
    const commission = await getValidatorCommission(nowApi, validator);
    let validatorReward;
    if (commission < 1) {
      const stakersTotalDiff = await getStakersBalanceDiffSum(preApi, nowApi, validator);
      sumDiff = bigAdd(sumDiff, stakersTotalDiff);
      // todo: get stakers balance diff
    }

    if (commission <= 0) {
      validatorReward = 0;
    } else {
      validatorReward = new BigNumber(validatorTotal).multipliedBy(commission).toFixed(0);
    }
    const balanceDiff = await getBalanceDiff(preApi, nowApi, validator);
    if (point > 0) {
      sumDiff = bigAdd(sumDiff, balanceDiff);
    }
    sumPoint += point;
    console.log(`validator ${validator} commission: ${commission} total: ${validatorReward}, diff: ${balanceDiff}`);
  }

  console.log(`sumDiff = ${sumDiff}, total = ${totalPayout}, expected = ${expectedDiff}`);

  // const blockHash = await findBlockHash(blockHeight, api);
  // const blockApi = await api.at(blockHash);
  // const raw = await blockApi.query.staking.currentElected();
  // const rawEra = await blockApi.query.staking.currentEra();
  // const elected = raw.toJSON();
  // const rawPoints = await blockApi.query.staking.currentEraPointsEarned();
  // const points = rawPoints.toJSON();
  //
  // console.log("elected", elected);
  // console.log("points", points)
  // const { elected: parentElected, points: parentPoints } = await getParent(api);

  process.exit(0);
})();
