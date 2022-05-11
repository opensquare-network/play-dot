const { getApi } = require("../api");
const BigNumber = require("bignumber.js");

const TreasuryAccount = "F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29";

;(async () => {
  const api = await getApi();
  const height = 1209019;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const free = await blockApi.query.balances.freeBalance(TreasuryAccount);
  const reserved = await blockApi.query.balances.reservedBalance(TreasuryAccount);
  const total = new BigNumber(free.toString()).plus(reserved.toString()).toString();

  console.log(total)
  process.exit(0);
})()
