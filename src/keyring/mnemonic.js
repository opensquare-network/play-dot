const { mnemonicGenerate } = require("@polkadot/util-crypto");

;(async () => {
  const phase = mnemonicGenerate();
  console.log(phase);
})()
