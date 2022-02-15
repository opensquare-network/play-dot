const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const conviction = api.registry.createType('Conviction', 6);
  console.log(conviction)
})();
