const { getCommonApi } = require("../../common/api");
const { findBlockHash } = require("../../common/blockHash");
const { encodeAddress } = require("@polkadot/util-crypto");

async function getValidators(blockApi) {
  const entries = await blockApi.query.staking.validators.entries();
  const validators = [];
  for (const [storageKey, value] of entries) {
    const validator = storageKey.args[0].toString();
    const addr = encodeAddress(validator, 2);
    validators.push(addr);
  }

  return validators;
}

async function getValidatorsBySession(blockApi) {
  const validators = await blockApi.query.session?.validators();
  console.log("validators", validators.length);
  return validators.toJSON();
}

async function getValidatorCount(blockApi) {
  /// The ideal number of staking participants.
  const raw = await blockApi.query.staking?.validatorCount();
  console.log("validators", raw.toString());
}

(async () => {
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  // const height = 1379482;
  const height = 20000000;
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  const vByStaking = await getValidators(blockApi);
  const vBySession = await getValidatorsBySession(blockApi);
  await getValidatorCount(blockApi)

  process.exit(0);
})();
