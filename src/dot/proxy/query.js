const { findBlockHash } = require("../../common/blockHash");
const { getApi } = require("../api");

async function queryProxies(api, delegator, height) {
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  const proxies = await blockApi.query.proxy.proxies(delegator);

  console.log(proxies.toJSON());
}

(async () => {
  const api = await getApi();
  const delegator = "1KvKReVmUiTc2LW2a4qyHsaJJ9eE9LRsywZkMk5hyBeyHgw";

  await queryProxies(api, delegator, 11178419);

  process.exit(0)
})();
