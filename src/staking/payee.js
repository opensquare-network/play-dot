const { getCommonApi } = require("../common/api");
const { findBlockApiByHeight } = require("../common/blockHash");

async function query(api) {
  const payee = await api.query.staking.payee("14SLfFJpiC7uDFGjVXdMvJd5buoRoxR632dxcG19s3gbeLTz");
  console.log(payee.toJSON());
}

async function entries(api) {
  const entries = await api.query.staking.payee.entries();
  for (const [storageKey, value] of entries) {
    const addr = storageKey.args[0].toString();
    const rewardDestination = value.toJSON();
    console.log(addr, rewardDestination);
  }
}

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  // const blockApi = await findBlockApiByHeight(331141, api);
  const blockApi = await findBlockApiByHeight(22031569, api);
  await query(blockApi);

  process.exit(0);
})();
