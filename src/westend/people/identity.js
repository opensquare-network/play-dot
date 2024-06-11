const { getApi } = require("./api");

(async () => {
  const api = await getApi();
  const entries = await api.query.identity.identityOf.entries()

  for (const [storageKey, identityOfOpt] of entries) {
    const account = storageKey.args[0].toString();
    console.log("account", account);

    if (identityOfOpt.isSome) {
      console.log("identityOfOp", identityOfOpt.toJSON());
    }
  }

  process.exit(0);
})();
