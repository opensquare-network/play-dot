const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://rpc.argon.network");

  const blockHash = await api.rpc.chain.getBlockHash(96888);
  const block = await api.rpc.chain.getBlock(blockHash);

  const blockApi = await api.at(blockHash);
  const events = await blockApi.query.system.events()

  const decodedError = blockApi.registry.findMetaError(events[14].event.data.dispatchError.asModule);
  const { docs, method, section } = decodedError;

  console.log(`${section}.${method}: ${docs.join(' ')}`);
  // bitcoinLocks.InsufficientVaultFunds:
})();
