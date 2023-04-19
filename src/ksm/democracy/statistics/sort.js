const BigNumber = require("bignumber.js");
const LOCKS = [1, 10, 20, 30, 40, 50, 60];
const multipliers = [0.1, 1, 2, 3, 4, 5, 6]

function calcVotes(capital = 0, conviction = 0) {
  return new BigNumber(capital)
    .multipliedBy(LOCKS[conviction])
    .div(10).toFixed(0, 1);
}

function sortVotesWithConviction(votes = []) {
  return votes.sort((a, b) => {
    const ta = new BigNumber(a.balance)
      .multipliedBy(LOCKS[a.conviction])
      .div(10);
    const tb = new BigNumber(b.balance)
      .multipliedBy(LOCKS[b.conviction])
      .div(10);
    return new BigNumber(ta).gt(tb) ? -1 : 1;
  });
}

module.exports = {
  sortVotesWithConviction,
  LOCKS,
  multipliers,
  calcVotes,
}
