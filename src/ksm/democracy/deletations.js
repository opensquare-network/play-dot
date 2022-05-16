const { getApi } = require("../api");
const { encodeAddress } = require("@polkadot/util-crypto");

;(async () => {
  const api = await getApi();
  // const height = 56181;
  // const height = 295787;
  const height = 281787;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const delegations = await blockApi.query.democracy.delegations.entries();
  const rawKey = delegations[0][0]
  const slicedIndex = rawKey.length = 64 ? 32 : 40;
  const addr = encodeAddress(delegations[0][0].slice(slicedIndex), 2);
  console.log(addr);

  console.log(delegations.toJSON());
})()
