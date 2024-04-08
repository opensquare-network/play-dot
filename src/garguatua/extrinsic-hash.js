const { getApi } = require("./api");
const { keccakAsHex } = require("@polkadot/util-crypto");
const { waitReady } = require("@polkadot/wasm-crypto");

;(async () => {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(206081);
  const block = await api.rpc.chain.getBlock(blockHash);
  const extrinsics = block.block.extrinsics;
  await waitReady();

  const extrinsicU8a = extrinsics[2].toU8a();

  const hash = keccakAsHex(extrinsicU8a, 256);
  console.log("hash", hash); // 0xebcbbcadf0a172b69c4a39d05db274774b853743bc2c219e240317adb6f6be9f

  process.exit(0);
})();
