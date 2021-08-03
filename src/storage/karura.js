const { ApiPromise, WsProvider } = require("@polkadot/api");
const { typesBundleForPolkadot } = require('@acala-network/type-definitions');
const { GenericCall } = require("@polkadot/types");

let provider = null;
let api = null;

async function main() {
  const typesBundle = { ...typesBundleForPolkadot, }
  provider = new WsProvider('wss://karura-rpc-3.aca-api.network/ws');
  api = new ApiPromise({ provider, typesBundle });
  await api.isReady;

  console.log('good')
  await queryProposal();
  // use api
}

async function queryProposal() {
  const blockHash = await api.rpc.chain.getBlockHash(135713);
  const props = await api.query.democracy.publicProps.at(blockHash);

  const [, proposalHash,] = props[0].toJSON()

  const preImageBlockHash = await api.rpc.chain.getBlockHash(135737);
  const image = await api.query.democracy.preimages.at(preImageBlockHash, proposalHash);

  const imageData = image.value.asAvailable.data

  const call = new GenericCall(api.registry, imageData);

  console.log('method:', call.method)

  console.log('args:')
  for (const arg of call.meta.args) {
    console.log('\t', arg.name.toString());
  }

  const tabledBlockHash = await api.rpc.chain.getBlockHash(144000);
  const allEvents = await api.query.system.events.at(tabledBlockHash);
  for (const event of allEvents) {
    console.log(event)
  }

  await provider.disconnect()
}


main()
