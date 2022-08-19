const { getApi } = require("../api");
const diff = require("lodash.difference");

async function getMembers(height) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const raw = await blockApi.query.council.members();
  return raw.toJSON()
}

async function compare(height) {
  const oldMembers = await getMembers(height - 1);
  console.log(oldMembers, oldMembers);
  // console.log('has jam', oldMembers.includes('H9eSvWe34vQDJAWckeTHWSqSChRat8bgKHG39GC1fjvEm7y'))
  const newMembers = await getMembers(height);

  const removedOnes = diff(oldMembers, newMembers);
  const addedOnes = diff(newMembers, oldMembers);

  console.log('removedOnes', removedOnes);
  console.log('addedOnes', addedOnes);
}

;(async () => {
  // const members = await getMembers(54289);
  // console.log(members)

  const height = 12480986;
  await compare(height);

  process.exit(0);
})();
