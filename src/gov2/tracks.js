const { getApi } = require("./api");
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
  const height = 56180;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);
  const tracks = blockApi.consts.referenda.tracks.toJSON();
  const normalized = tracks.map(([id, obj]) => {
    return {
      id,
      info: normalize(obj),
    }
  });

  console.log(normalized);
  process.exit(0);
})()
