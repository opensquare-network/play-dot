const { getApi } = require("../api");

(async () => {
  const api = await getApi();
  const delegator = "13TxZJUkFPLAVnSmHgDbtcnao3eM3hNG7MJh1eUwt9ro65d1";
  // const delegator = "16DkQfUAuAaybVS9yX4MuuhXAyFyzckHfPi3rp3WeqMy3bht";
  const proxies = await api.query.proxy.proxies(delegator);

  console.log(proxies.toJSON());
})();
