const { getCommonApi } = require("../../common/api");
const { findBlockHash } = require("../../common/blockHash");

async function check(api) {
  const blockHeight = 6713103;
  const blockHash = await findBlockHash(blockHeight, api);
  const blockApi = await api.at(blockHash);

  console.log(blockApi);
}

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  await check(api);

  process.exit(0);
})();
