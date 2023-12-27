const { getApi } = require("./api");

async function entries() {
  const api = await getApi();
  const entries = await api.query.fellowshipCore.member.entries();
  for (const [storageKey, memberStatus] of entries) {
    const member = storageKey.args[0].toString();
    const status = memberStatus.toJSON();
    console.log("member", member, "status", status);
  }
}

async function query() {
  const api = await getApi();
  const rawStatus = await api.query.fellowshipCore.member("133fH6a3fadsGa9C7mizmqdPigaTr2JYUgWqSn1LKYK1MX3B");
  console.log(rawStatus.toJSON());
}

;(async () => {
  // await entries();
  await query();

  process.exit(0);
})();
