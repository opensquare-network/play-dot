const { createClient,  } = require("polkadot-api");
const { getWsProvider } = require("@polkadot-api/ws-provider/node");
const { dot } = require("@polkadot-api/descriptors");

(async () => {
  // console.log(test);
  const provider = await getWsProvider("wss://rpc.ibp.network/polkadot");
  const client = createClient(provider);
  const finalized = await client.getFinalizedBlock();
  const body = await client.getBlockBody(finalized.hash);
  console.log(dot);
  const typedApi = await client.getTypedApi(dot);
  process.exit(0);
})();
