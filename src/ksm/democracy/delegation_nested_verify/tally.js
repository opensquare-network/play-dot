const { getApi } = require("../../api");

;(async () => {
  const api = await getApi();
  // const height = 14950228; // aye: 6250671817843730
  const height = 14950229; // aye: 7514748237843731, gap: 1264076420000001
  const blockHash = await api.rpc.chain.getBlockHash(height - 1);
  const blockApi = await api.at(blockHash);

  const raw = await blockApi.query.democracy.referendumInfoOf(239);

  console.log('aye', raw.unwrap().asOngoing.tally.ayes.toString());
  process.exit(0);
})()
