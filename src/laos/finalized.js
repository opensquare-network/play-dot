const { getApi } = require("./api");

(async () => {
  const api = await getApi();
  api.rpc.chain.subscribeNewHeads((header) => {
    console.log(header.number.toNumber());
  });
})()
