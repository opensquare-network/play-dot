const BigNumber = require("bignumber.js");
const { getApi } = require("../../../api");

function normalize(track = {}) {
  return Object.entries(track).reduce((result, [name, value]) => {
    if (name === "decisionDeposit") {
      result[name] = new BigNumber(value).toString();
    } else {
      result[name] = value;
    }

    return result;
  }, {})
}

;(async () => {
  const api = await getApi();
  const tracks = api.consts.fellowshipReferenda.tracks.toJSON();

  const normalized = tracks.map(([id, obj]) => {
    return {
      id,
      ...normalize(obj),
    }
  });

  process.exit(0);
})();
