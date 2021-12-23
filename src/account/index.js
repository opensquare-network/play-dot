const { ApiPromise, WsProvider } = require("@polkadot/api");
let provider = null;
let api = null;

const defaultKsmEndPoint = "wss://kusama-rpc.polkadot.io";

async function getApi() {
  if (!api) {
    provider = new WsProvider(defaultKsmEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}

async function main() {
  await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(7812704); // 38745
  const a1 = await api.query.system.account.at(blockHash, 'FcxNWVy5RESDsErjwyZmPCW6Z8Y3fbfLzmou34YZTrbcraL');
  const free = a1.data.free.toNumber()
  console.log('free', free)
}

main().finally(() => {
  process.exit(0)
});

// 30000000
// 150000000000
// 3000000000
// 10000000000
// 2500110428175028
// 2500110428175028
// 229065899105891
// 229075819105896
