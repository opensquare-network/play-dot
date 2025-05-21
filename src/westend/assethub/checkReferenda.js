const { getCommonApi } = require("../../common/api");

async function hasReferenda(api, height) {
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  return !!blockApi.query.referenda;
}

async function binaryFindReferenda(api) {
  let start = 11000000, end = 11742697;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2 + '');
    const yes = await hasReferenda(api, middle);
    if (yes) {
      end = middle;
      console.log(`${middle} has referenda`);
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }
}

async function getRelayChainHeight(paraApi, height) {
  const blockHash = await paraApi.rpc.chain.getBlockHash(height);
  const blockApi = await paraApi.at(blockHash);
  const num = await blockApi.query.parachainSystem.lastRelayChainBlockNumber();
  console.log(num.toJSON());
}

(async () => {
  const api = await getCommonApi("wss://westend-asset-hub-rpc.polkadot.io/");
  // const height = 11716647;
  const height = 11746390;
  // const has = await hasReferenda(api, height);
  // console.log(`${height} ${has ? "has" : "not has"} referenda`);
  console.log(await getRelayChainHeight(api, height));

  process.exit(0);
})();
