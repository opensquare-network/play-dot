const { getCommonApi } = require("../common/api");
const { findBlockHash } = require("../common/blockHash");
const { perbillFromRational, calcWithPerbill, oneMinusPerbill, perbillMul } = require("./utils");
const BigNumber = require("bignumber.js");

async function getEraReward(blockApi, era) {
  const optionalStorage = await blockApi.query.staking.erasValidatorReward(era);
  if (optionalStorage.isSome) {
    return optionalStorage.unwrap().toString();
  }

  return 0;
}

async function getEraRewardPoints(blockApi, era) {
  const storage = await blockApi.query.staking.erasRewardPoints(era);
  return storage.toJSON();
}

async function getValidatorExposure(blockApi, era, validator) {
  const storage = await blockApi.query.staking.erasStakersClipped(era, validator);
  return storage.toJSON();
}

async function getValidatorPrefs(blockApi, era, validator) {
  const storage = await blockApi.query.staking.erasValidatorPrefs(era, validator);
  return storage.toJSON();
}

(async () => {
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  const blockHeight = 1379482;
  const blockHash = await findBlockHash(blockHeight, api);
  const blockApi = await api.at(blockHash);
  const block = await api.rpc.chain.getBlock(blockHash);
  const extrinsic = block.block.extrinsics[3];

  const nominator = "Ho38uF7NBjXMyJLdyKcYHAgFjADSHgd2JzEbeRJGDF7mSsX";

  const { args } = extrinsic.method;
  const era = args[0].toNumber();
  const eraPayout = await getEraReward(blockApi, era);
  const eraPoints = await getEraRewardPoints(blockApi, era);
  const eraTotalPoint = eraPoints.total;

  let total = BigInt(0);
  let totalNominatorPart = BigInt(0);
  const validatorIndexArr = args[1].toJSON();
  for (const [validator, nominatorIndex] of validatorIndexArr) {
    const prefs = await getValidatorPrefs(blockApi, era, validator);
    const commissionPerbill = prefs.commission;
    const validatorPoint = eraPoints.individual[validator];

    const exposure = await getValidatorExposure(blockApi, era, validator);
    const nominatorExposure = exposure.others[nominatorIndex];
    if (nominatorExposure.who !== nominator) {
      console.log(`${validator} index not match`);
      continue;
    }

    if (exposure.total <= 0) {
      console.log(`${validator} exposure 0`);
      continue;
    }

    const validatorPart = perbillFromRational(validatorPoint, eraTotalPoint);
    const stakersPart = perbillMul(validatorPart, oneMinusPerbill(commissionPerbill));
    const nominatorPart = perbillMul(stakersPart, perbillFromRational(nominatorExposure.value, exposure.total));
    totalNominatorPart += nominatorPart;

    console.log(`${validator} ${nominatorPart}`);
  }

  const nominatorPay = calcWithPerbill(eraPayout, totalNominatorPart);
  const anotherWay = new BigNumber(eraPayout).multipliedBy(totalNominatorPart.toString()).div(Math.pow(10, 9));

  console.log(`total pay ${anotherWay.toFixed(0)}`);
  process.exit(0);
})();
