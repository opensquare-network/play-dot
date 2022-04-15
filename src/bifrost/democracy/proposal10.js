const { findBlockApi } = require("../utils");

;(async () => {
  // const height = 1483826;
  const height = 1487307;
  const blockApi = await findBlockApi(height);
  const raw = await blockApi.query.democracy.publicProps();
  const allProposals = raw.toJSON() || [];

  console.log(allProposals.map(([index]) => index));
  process.exit(0);
})()
