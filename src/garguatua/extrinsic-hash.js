const { getApi } = require("./api");
const { keccakAsHex, blake2AsHex } = require("@polkadot/util-crypto");
const { waitReady } = require("@polkadot/wasm-crypto");

;(async () => {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(206081);
  const block = await api.rpc.chain.getBlock(blockHash);
  const extrinsics = block.block.extrinsics;
  await waitReady();

  const extrinsicU8a = extrinsics[2].toU8a();

  const blake2Hash = blake2AsHex(extrinsicU8a, 256);
  const hash = keccakAsHex(extrinsicU8a, 256);
  console.log("hash", hash, // 0xebcbbcadf0a172b69c4a39d05db274774b853743bc2c219e240317adb6f6be9f
    "blake2Hash", blake2Hash); // 0x2642e53a512ca6eb3d0f0353ba800f4ab6f68015d7341d6b3ce46fb024f09abd

  process.exit(0);
})();
