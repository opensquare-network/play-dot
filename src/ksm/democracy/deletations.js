const { getApi } = require("../api");
const { encodeAddress } = require("@polkadot/util-crypto");

;(async () => {
  const api = await getApi();
  // const height = 56181;
  // const height = 295787;
  const height = 281787;
  // const height = 1574000;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const delegations = await blockApi.query.democracy.delegations.entries();
  const storageKey = delegations[0][0];
  if (storageKey.length === 72) {
    const delegator = encodeAddress(storageKey.slice(40), 2)
    console.log('delegator', delegator);
  }

  const [toRawAddr, rawConviction] = delegations[0][1];
  console.log('delegate to', toRawAddr.toString());
  console.log(rawConviction.toNumber());

  process.exit(0);
})()
