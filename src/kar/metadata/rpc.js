const { getKarApi } = require("../api");

;(async () => {
  const api = await getKarApi();
  const metadata = await api.rpc.state.getMetadata()
  console.log(metadata);
})()
