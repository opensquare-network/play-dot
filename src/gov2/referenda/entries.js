const { getApi } = require("../api");

;(async () => {
  const api = await getApi();

  const referenda = await api.query.referenda;
  const arr = await referenda.referendumInfoFor.entries();
  const normalized = [];
  const ongoing = [];
  for (const [storageKey, optionReferendumInfo] of arr) {
    const referendumIndex = storageKey.args[0].toNumber();

    const unwrap = optionReferendumInfo.unwrap();
    const obj = {
      referendumIndex,
      info: unwrap.toJSON(),
    };
    normalized.push(obj);

    if (unwrap.isOngoing) {
      ongoing.push(obj);
    }
  }

  console.log(normalized);

  process.exit(0);
})();
