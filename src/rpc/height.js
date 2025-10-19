const { getCommonProvider } = require("../common/api");

(async () => {
  const provider = await getCommonProvider("wss://archive.testnet.cere.network/ws");
  await provider.isReady;
  const headHash = await provider.send("chain_getFinalizedHead", []);
  const head = await provider.send("chain_getBlock", [headHash]);
  return parseInt(head.block.header.number);
})();
