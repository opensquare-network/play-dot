const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const height = 1574000;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const rawVote = await blockApi.query.democracy.voteOf([42, "D3icRvk43Bj69ChTPkx5v4pEQKGqDY95hHXiBB1JBFVwtvP"]);
  console.log(rawVote);
})();
