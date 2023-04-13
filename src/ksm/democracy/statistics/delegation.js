function extractDelegations(allVotes, directVotes) {
  const allDelegations = allVotes.filter(vote => {
    const { voting } = vote;
    return voting.isDelegating;
  });

  return allDelegations.reduce((result, delegation) => {
    const delegating = delegation.voting.asDelegating;
    const target = delegating.target.toString();
    const to = directVotes.find(({ account, isStandard }) => account === target && isStandard);
    if (!to) {
      return result;
    }

    return [
      ...result,
      {
        account: delegation.account,
        balance: delegating.balance.toBigInt().toString(),
        isDelegating: true,
        aye: to.aye,
        conviction: delegating.conviction.toNumber(),
      }
    ];
  }, []);
}

module.exports = {
  extractDelegations,
}
