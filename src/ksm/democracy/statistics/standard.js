function objectSpread(dest, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    const src = sources[i];

    if (src) {
      Object.assign(dest, src);
    }
  }

  return dest;
}

function extractStandard(account, vote) {
  const standard = vote.asStandard;
  const balance = standard.balance.toBigInt().toString();

  return {
    account,
    isDelegating: false,
    isStandard: true,
    isSplit: false,
    balance,
    aye: standard.vote.isAye,
    conviction: standard.vote.conviction.toNumber(),
  }
}

function extractSplit(account, vote) {
  const split = vote.asSplit;
  const ayeBalance = split.aye.toBigInt().toString();
  const nayBalance = split.nay.toBigInt().toString();
  const commonObj = {
    account,
    isDelegating: false,
    isStandard: false,
    isSplit: true,
  };

  return [
    objectSpread({ ...commonObj }, {
      balance: ayeBalance,
      aye: true,
      conviction: 0,
    }),
    objectSpread({ ...commonObj }, {
      balance: nayBalance,
      aye: false,
      conviction: 0,
    }),
  ]
}

function extractDirectVotes(allVotes, referendumIndex) {
  return allVotes.filter(vote => {
    const { voting } = vote;
    return voting.isDirect;
  }).map(({ account, voting }) => {
    return {
      account,
      votes: voting.asDirect.votes.filter(([idx]) =>
        idx.eq(referendumIndex),
      ),
    };
  })
    .filter(({ votes }) => votes.length > 0)
    .map(({ account, votes }) => {
      return {
        account,
        vote: votes[0][1],
      };
    })
    .reduce((result, { account, vote }) => {
      if (vote.isStandard) {
        result.push(extractStandard(account, vote));
      } else if (vote.isSplit) {
        result.push(...extractSplit(account, vote));
      }

      return result;
    }, []);
}

module.exports = {
  extractDirectVotes,
}
