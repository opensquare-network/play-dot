function objectSpread(dest, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    const src = sources[i];

    if (src) {
      Object.assign(dest, src);
    }
  }

  return dest;
}

function extractStandardVote(account, vote) {
  const standard = vote.asStandard;
  const balance = standard.balance.toBigInt().toString();

  return [
    objectSpread(
      {
        account,
        isDelegating: false,
        type: "Standard",
      },
      {
        balance,
        aye: standard.vote.isAye,
        conviction: standard.vote.conviction.toNumber(),
      },
    ),
  ];
}

function extractSplitVote(account, vote) {
  const split = vote.asSplit;
  const ayeBalance = split.aye.toBigInt().toString();
  const nayBalance = split.nay.toBigInt().toString();
  const common = {
    account,
    isDelegating: false,
    type: "Split",
  }

  return [
    objectSpread(
      { ...common },
      {
        balance: ayeBalance,
        aye: true,
        conviction: 0,
      },
    ),
    objectSpread(
      { ...common },
      {
        balance: nayBalance,
        aye: false,
        conviction: 0,
      },
    ),
  ];
}

function extractSplitAbstainVote(account, vote) {
  const splitAbstain = vote.asSplitAbstain;
  const ayeBalance = splitAbstain.aye.toBigInt().toString();
  const nayBalance = splitAbstain.nay.toBigInt().toString();
  const abstainBalance = splitAbstain.abstain.toBigInt().toString();
  const common = {
    account,
    isDelegating: false,
    type: "SplitAbstain",
  }

  return [
    objectSpread(
      { ...common },
      {
        balance: ayeBalance,
        aye: true,
        conviction: 0,
      },
    ),
    objectSpread(
      { ...common },
      {
        balance: nayBalance,
        aye: false,
        conviction: 0,
      },
    ),
    objectSpread(
      { ...common },
      {
        balance: abstainBalance,
        isAbstain: true,
        conviction: 0,
      },
    ),
  ];
}

module.exports = {
  extractSplitVote,
  extractStandardVote,
  extractSplitAbstainVote,
}
