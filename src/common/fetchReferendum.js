async function fetchReferendum(referendumIndex) {
  const res = await fetch(`https://polkadot.subsquare.io/api/gov2/referendums/${referendumIndex}`);
  return await res.json()
}

module.exports = {
  fetchReferendum,
}
