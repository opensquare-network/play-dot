const { getApi } = require("./api");
const { keccakAsHex } = require("@polkadot/util-crypto");
const { waitReady } = require("@polkadot/wasm-crypto");

;(async () => {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(100);
  const block = await api.rpc.chain.getBlock(blockHash);

  await waitReady();

  const headerU8a = block.block.header.toU8a();

  const hex = keccakAsHex(headerU8a, 256);
  console.log("hex", hex); // 0x02e5d3be064810269388c46042242c19e093fc35acd3c907681bac5773da137d

  process.exit(0);
})()
