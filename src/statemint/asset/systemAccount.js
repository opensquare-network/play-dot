const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const account = "14xmwinmCEz6oRrFdczHKqHgWNMiCysE2KrA4jXXAAM1Eogk";

  const storage = await api.query.system.account(account);
  const { free, reserved } = storage.data;
  const all = free.toBigInt() + reserved.toBigInt();
  console.log(all.toString())
  console.log(storage);
})()
