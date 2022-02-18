const { getBncApi } = require("./api");

async function getBlockHash(height) {
  const api = await getBncApi();
  return await api.rpc.chain.getBlockHash(height);
}

;(async () => {
  const api = await getBncApi();

  const externalHash = '0xf4f926c7dec166bd5274743b1c06223df34dc2db889abf77185a23d8a731f9ec';
  const tcMotionHeight = 1251002;
  const height = [
    // 1251002, // the height of the tc motion to fast track
    1250500,
  ];

  // https://bifrost.subscan.io/extrinsic/1249827-2 motion missed
  // 1250984 !!!
  const blockHash = await getBlockHash(1250985);
  const blockApi = await api.at(blockHash);
  const raw = await blockApi.query.democracy.nextExternal();
  console.log(raw.toJSON());
  process.exit(0);
})()
