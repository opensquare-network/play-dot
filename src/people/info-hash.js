const { getCommonApi } = require("../common/api");

(async () => {
  const api = await getCommonApi("wss://sys.ibp.network/people-polkadot");
  const id = await api.query.identity.identityOf("14gMJV95zwxUsFEZDSC8mtBVifS6SypKJkfBKANkMsLZdeVb")
  console.log(id.unwrap().info.toJSON())
  const hash = api.registry.hash(id.unwrap().info.toU8a());
  console.log(hash.toString())

  process.exit(0);
})();
