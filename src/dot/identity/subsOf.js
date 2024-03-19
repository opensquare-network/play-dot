const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const jaco = "1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv";
  // const jaco = "14bUYpiF2oxVpmXDnFxBipSi4m9zYBThMZoLpY8bRQrPQNG1";
  const subs = await api.query.identity.subsOf(jaco);

  process.exit(0);
})();
