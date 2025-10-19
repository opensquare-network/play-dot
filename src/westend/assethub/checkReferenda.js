const { getCommonApi } = require("../../common/api");

async function hasReferenda(api, height) {
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  if (!blockApi.query.referenda) {
    return false;
  }

  const entries = await blockApi.query.referenda.referendumInfoFor.entries();
  return entries.length > 0;
}

async function binaryFindReferenda(api) {
  let start = 11150000, end = 11151102;
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
  // const api = await getCommonApi("wss://westend-asset-hub-rpc.polkadot.io/");
  // const api = await getCommonApi("wss://pas-rpc.stakeworld.io/assethub"); // for paseo
  const api = await getCommonApi("wss://ksm-rpc.stakeworld.io/assethub"); // for kusama
  await binaryFindReferenda(api);
  // const height = 11716647;
  // const height = 2568458;
  // const has = await hasReferenda(api, height);
  // console.log(`${height} ${has ? "has" : "not has"} referenda`);
  // console.log(await getRelayChainHeight(api, height));

  process.exit(0);
})();
