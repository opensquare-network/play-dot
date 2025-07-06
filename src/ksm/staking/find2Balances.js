const { findBlockHash } = require("../../common/blockHash");
const { getCommonApi } = require("../../common/api");

async function isAccountAndBalance(api, height) {
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  const event = blockApi.events.staking.Reward
  console.log(event);
}

(async () => {
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  await isAccountAndBalance(api, 8945231);

  process.exit(0);
})();
