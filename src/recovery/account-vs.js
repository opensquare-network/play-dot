const { getCommonApi } = require("../common/api");

async function printAccount(api, blockHeight, addr) {
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  const a1 = await api.query.system.account.at(blockHash, addr);
  console.log(a1.toJSON());
}

(async () => {
  const api = await getCommonApi("wss://westend-asset-hub-rpc.polkadot.io");
  const height = 15403220;
  const addr = "5C4qRfw4xxyRk5TPTk9HMYG9sxQ7LFGxqqaa3CLQoc1hLfzg";
  await printAccount(api, height - 1, addr);
  await printAccount(api, height, addr);
  process.exit(0);
})();
