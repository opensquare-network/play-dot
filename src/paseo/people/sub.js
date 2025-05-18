const { getCommonApi } = require("../../common/api");
(async () => {
  const api = await getCommonApi("wss://sys.ibp.network/people-paseo");
  api.query.identity.identityOf("15ifSDJD2wA7XWwDsitFCHu3wsEfkeBESSxkQg3q8sHqAF2R", (r) => {
    console.log("direct id sub", JSON.stringify(r?.toJSON(), null, 2));
  });
})()
