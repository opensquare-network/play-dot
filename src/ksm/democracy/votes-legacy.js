const { getApi } = require("../api");

async function getBalance(blockHash, blockApi, account) {
  if (blockApi.query.system?.account) {
    const accountInfo = await blockApi.query.system.account(account);
    return accountInfo.data.free.toString();
  }

  if (blockApi.query.balances.freeBalance) {
    const rawBalance = await blockApi.query.balances.freeBalance(account);
    if (rawBalance) {
      return rawBalance.toString()
    }
  }

  return 0;
}

;(async () => {
  const api = await getApi();
  const passedHeight = 692587;
  const height = passedHeight - 1;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const targetReferendumIndex = 21;
  const temp = await blockApi.query.democracy.votersFor(targetReferendumIndex);

  const addresses = temp.toJSON();
  let votes = [];
  if (addresses.length > 0) {
    votes = await blockApi.query.democracy.voteOf.multi(addresses.map(addr => ([targetReferendumIndex, addr])));
    console.log(votes);
  }

  const balancePromises = [];
  for (const address of addresses) {
    balancePromises.push(await getBalance(blockHash, blockApi, address))
  }
  const balances = await Promise.all(balancePromises);

  addresses.map((address, index) => {
    return {
      account: address,
      isDelegating: false,
      vote: votes[index] || blockApi.registry.createType('Vote'),
      balance: balances[index] || 0,
    }
  })

  console.log(temp.toJSON());
  process.exit(0);
})();
