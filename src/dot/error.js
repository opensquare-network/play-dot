const { getCommonApi } = require("../common/api");
const { pro } = require("ccxt");

(async () => {
  const api = await getCommonApi("wss://polkadot.api.onfinality.io/public-ws");
  const blockHash = await api.rpc.chain.getBlockHash(21673752);

  const blockApi = await api.at(blockHash);
  const events = await blockApi.query.system.events()

  const decodedError = blockApi.registry.findMetaError(events[51].event.data.dispatchError.asModule);
  const { docs, method, section } = decodedError;

  console.log(`${section}.${method}: ${docs.join(' ')}`);
  process.exit(0);
})();
