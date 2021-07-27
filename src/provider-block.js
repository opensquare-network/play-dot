const { WsProvider } = require("@polkadot/api");

let provider = null;

const dotEndPoint = "wss://polkadot.elara.patract.io/";
const defaultKsmEndPoint = "wss://kusama.elara.patract.io/";

async function getProvider() {
  if (!provider) {
    provider = new WsProvider(defaultKsmEndPoint);
    await provider.isReady
  }

  return provider;
}

const eventsKey = '0x26aa394eea5630e07c48ae0c9558cef780d41e5e16056765bc8461851072c9d7';

async function main() {
  const provider = await getProvider()

  const blockHash = await provider.send('chain_getBlockHash', [15])
  console.log('blockHash', blockHash)

  // const runtimeVersion = await provider.send('chain_getRuntimeVersion', [blockHash])
  // console.log(runtimeVersion)
  // console.log('specVersion', runtimeVersion.specVersion)

  const block = await provider.send('chain_getBlock', [blockHash])
  console.log('block', block)
  //
  // const events = await provider.send('state_getStorageAt', [eventsKey, blockHash])
  // console.log('events', events)

  await provider.disconnect()
}

main()
  .catch(console.error)
