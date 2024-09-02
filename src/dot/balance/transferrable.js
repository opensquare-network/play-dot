const {getApi} = require("../api");

(async () => {
  const api = await getApi();
  const addr = "13TRAXTALwNp5vApqwiE74fg8G8ypMyaF9TxRfs4RwrCwxUE";
  const a = await api.derive.balances.account(addr);
  const all = await api.derive.balances.all(addr);
  console.log(a, all);
})();
