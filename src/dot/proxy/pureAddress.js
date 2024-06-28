const { blake2AsHex, cryptoWaitReady } = require("@polkadot/util-crypto");

(async () => {
  const who = "149z9eSn14BanGEXvLVYM4YjBDoaLiZpoVc37FZ7cesQUFLq";
  const height = 12890409;
  const extIndex = 3;
  const proxyType = "Any";
  const index = 0;

  await cryptoWaitReady;

  const str = `modlpy/proxy____${ who }${ height }${ extIndex }${ proxyType }${ index }`;
  const hex = blake2AsHex(str, 256);
  console.log(hex);
})();
