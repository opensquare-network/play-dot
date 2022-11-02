const { getApi } = require("../api");

function normalizeStandard(standardVote) {
  const balance = standardVote.balance.toString();
  const isAye = standardVote.vote.isAye;
  const conviction = standardVote.vote.conviction.toNumber();

  return {
    balance,
    vote: {
      isAye,
      conviction,
    }
  }
}

function normalizeSplit(splitVote) {
  const aye = splitVote.aye.toString();
  const nay = splitVote.nay.toString();

  return {
    aye,
    nay,
  }
}

;(async () => {
  const api = await getApi();
  const height = 81834;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const block = await api.rpc.chain.getBlock(blockHash);

  const method = block.block.extrinsics[1].method;
  const referendumIndex = method.args[0].toNumber();
  const voteArg = method.args[1];
  let vote;
  if (voteArg.isStandard) {
    vote = normalizeStandard(voteArg.asStandard);
  } else if (voteArg.isSplit) {
    vote = normalizeSplit(voteArg.asSplit);
  }

  const obj = {
    isStandard: voteArg.isStandard,
    isSplit: voteArg.isSplit,
    ...vote,
  }

  console.log(referendumIndex, vote);
  process.exit(0)
})()
