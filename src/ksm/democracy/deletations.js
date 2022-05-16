const { getApi } = require("../api");
const { encodeAddress } = require("@polkadot/util-crypto");

;(async () => {
  const api = await getApi();
  const height = 295787;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const delegations = await blockApi.query.democracy.delegations.entries();
  const addr = encodeAddress(delegations[0][0].slice(40), 2);
  console.log(addr);

  console.log(delegations);
})()
