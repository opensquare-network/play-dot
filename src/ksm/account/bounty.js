const { getApi } = require("../api");
const {
  bnToU8a,
  stringToU8a,
} = require("@polkadot/util");
const { decodeAddress, encodeAddress, blake2AsU8a } = require("@polkadot/util-crypto");

function subAccountId() {
  const index = "0";
  try {
    let seedBytes = stringToU8a("modlpy/trsrybt");
    let indexBytes = bnToU8a(parseInt(index), { bitLength: 16 });
    let combinedBytes = new Uint8Array(seedBytes.length + indexBytes.length);
    combinedBytes.set(seedBytes);
    combinedBytes.set(indexBytes, seedBytes.length);

    let entropy = blake2AsU8a(combinedBytes, 256);
    const address = encodeAddress(entropy, 2);
    console.log(address)
  } catch (e) {
  }
}

;(async () => {
  subAccountId();
  const api = await getApi();
  const prefix = "modlpy/trsrybt00";
  const test = api.registry.createType(
    "AccountId",
    stringToU8a(prefix.padEnd(32, "\0")),
  );

  console.log(test.toString());
  process.exit(0);
})();
