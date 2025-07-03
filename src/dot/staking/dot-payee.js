const { getCommonApi } = require("../../common/api");
const { findBlockHash } = require("../../common/blockHash");

async function entries(api) {
  const entries = await api.query.staking.payee.entriesPaged();
  for (const [storageKey, value] of entries) {
    const addr = storageKey.args[0].toString();
    const rewardDestination = value.toJSON();
    console.log(addr, rewardDestination);
  }
}

async function query(api) {
  const blockHeight = 6713103;
  const blockHash = await findBlockHash(blockHeight, api);
  const blockApi = await api.at(blockHash);
  const stash = "125xj1nYWcVcCM9CnLUydqEmuFwSNTmRybmyK65XWu8RFWK3";
  const rawInfo = await blockApi.query.staking.payee(stash);

  console.log(rawInfo);
}

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  await query(api);

  process.exit(0);
})();
