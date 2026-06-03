const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://westend-asset-hub-rpc.polkadot.io");
  const entries = await api?.query?.recovery?.attempt.entries();
  for (const [storageKey, optionalStorage] of entries) {
    const lost = storageKey.args[0].toString();
    const friendGroupIndex = storageKey.args[1].toNumber();
    console.log(`${lost} ${friendGroupIndex}`);
    const [attempt, ticket, deposit] = optionalStorage.unwrap();
    console.table(attempt.toJSON());
    console.table(ticket.toJSON());
    console.table(deposit.toJSON());
  }
  process.exit(0);
})();
