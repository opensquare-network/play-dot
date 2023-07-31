const { getApi } = require("./api");

;(async () => {
  const api = await getApi();
  const info = await api.derive.accounts.info("13UVJyLnbVp8c4FQeiGX8jnzknWTZz1EmmAfZxV5gSNv4ieD");
  console.log(info);
})();
