const { getCommonApi, findBlockApi } = require("../../common/api");

async function getTotal(api) {
  const raw = await api.query.balances.totalIssuance();
  console.log(raw.toString());
}

(async () => {
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  const height = 30819;
  await getTotal(await findBlockApi(api, height));
  await getTotal(await findBlockApi(api, height - 1));

  process.exit(0);

})();
