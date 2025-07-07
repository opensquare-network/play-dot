const { getCommonApi } = require("../common/api");
const { findBlockHash } = require("../common/blockHash");

(async () => {
  const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  const blockHeight = 1379482;
  const blockHash = await findBlockHash(blockHeight, api);
  const blockApi = await api.at(blockHash);
  const prefs = await blockApi.query.staking.erasValidatorPrefs(518, "FXezGfeLvze1DWUwwEc8MczpLSMnZrSDrcA7Ghyc84NaXGt");
  const nominator = await blockApi.query.staking.nominators("Ho38uF7NBjXMyJLdyKcYHAgFjADSHgd2JzEbeRJGDF7mSsX");

  console.log(nominator);
})();
