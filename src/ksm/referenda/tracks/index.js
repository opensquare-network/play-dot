const { getApi } = require("../../api");
const BigNumber = require("bignumber.js");

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
  const tracks = api.consts.referenda.tracks.toJSON();
  const normalized = tracks.map(([id, obj]) => {
    return {
      id,
      ...normalize(obj),
    }
  });

  process.exit(0);
})();
