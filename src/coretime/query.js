const { getApi } = require("./api");
const { findBlockApiByHeight } = require("../common/blockHash");

async function leases() {
  const api = await getApi();

  const blockApi = await findBlockApiByHeight(100987, api);
  const leases = await blockApi.query.broker.leases();
  console.log(leases.toJSON().length);
}

async function reservations() {
  const api = await getApi();

  const blockApi = await findBlockApiByHeight(100987, api);
  const reservation = await blockApi.query.broker.reservations();
  console.log(reservation.toJSON().length);
}

async function status() {
  const api = await getApi();
  const blockApi = await findBlockApiByHeight(100988, api);
  const status = await blockApi.query.broker.status();
  console.log(status.toJSON());
}

(async () => {
  // await leases();
  // await reservations();
  await status();

  process.exit(0);
})();
