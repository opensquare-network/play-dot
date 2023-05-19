const { getApi } = require("../api");
const BigNumber = require("bignumber.js");

async function main() {
  const api = await getApi();
  const height = 525663;

  const supply = await api.rpc.escrow.totalSupply(height);
  console.log('vKINT supply', new BigNumber(supply.amount.toString()).div(Math.pow(10, 12)).toString());
  process.exit(0);
}

main()
