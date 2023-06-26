const { getApi } = require("../api");

;(async () => {
  const api = await getApi();

  const hash = "0x09903c89351b498397fdbe088e803f95fd93f66896587cbe21780fa2a5727efb";

  let height = 17703777;
  let blockHash = await api.rpc.chain.getBlockHash(height);
  let blockApi = await api.at(blockHash);

  let raw = await blockApi.query.preimage.statusFor(hash);
  let json = raw.toJSON();
  while (json.unrequested) {
    height += 1;
    blockHash = await api.rpc.chain.getBlockHash(height);
    blockApi = await api.at(blockHash);
    raw = await blockApi.query.preimage.statusFor(hash);
    json = raw.toJSON()
    console.log(`${height} done`);
  }

  console.log(height, "is target");

  process.exit(0);
})()
