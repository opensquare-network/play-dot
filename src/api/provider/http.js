const { HttpProvider } = require("@polkadot/api");

;(async () => {
  const provider = new HttpProvider("https://westmint-rpc.polkadot.io");
  const result = await provider.send("chain_getHeader", [])

  console.log(parseInt(result.number));
})();
