const { getCommonApi } = require("../../common/api");
const { findBlockHash } = require("../../common/blockHash");

async function getValidators(api, height) {
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  const entries = await blockApi.query.staking.validators.entries();
  const validators = [];
  for (const [storageKey, value] of entries) {
    const validator = storageKey.args[0].toString();
    validators.push(validator);
  }

  console.log("validators", validators);
}

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  await getValidators(api, 6713103);

  process.exit(0);
})();
