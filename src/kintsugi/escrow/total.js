const { getApi } = require("../api");
const BigNumber = require("bignumber.js");
const { findBlockHash } = require("../../common/blockHash");

async function main() {
  const api = await getApi();
  const height = 6748191;
  const blockHash = await findBlockHash(height, api);

  const supply = await api.rpc.escrow.totalSupply(
    height,
    blockHash,
  ); // produce error: `(Execution(Other("Exported method EscrowApi_total_supply is not found")))`
  console.log('vKINT supply', new BigNumber(supply.amount.toString()).div(Math.pow(10, 12)).toString());
  process.exit(0);
}

main()
