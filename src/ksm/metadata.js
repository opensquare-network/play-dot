const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const metadata = await api.rpc.state.getMetadata()
  console.log(metadata);
})()
