const { ApiPromise, WsProvider } = require("@polkadot/api");
const msg = '0x02100204000100000700e87648170a13000100000700e8764817000d010004000101000ad6cd4dd19096987715b3eb73403fa238de922c19dd903077ec85950aeeb10e'

let provider = null;
let api = null;

const statemineEndPoint = "wss://statemine.api.onfinality.io/public-ws";

async function getApi() {
  if (!api) {
    provider = new WsProvider(statemineEndPoint);
    api = await ApiPromise.create({ provider });
  }

  return api;
}


async function main() {
  const height = 1271319;

  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(10373931);
  const registry = await api.getBlockRegistry(blockHash);

  try {
    const xcm = registry.registry.createType("VersionedXcm", msg, false)
    console.log(xcm)
  } catch (e) {
    console.error(e)
  }

}

main()
