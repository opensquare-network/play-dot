const { getCommonApi } = require("../../common/api");
const { findBlockApiByHeight } = require("../../common/blockHash");
const { u8aConcat } = require("@polkadot/util");

const EMPTY_U8A_32 = new Uint8Array(32);

function getTreasuryAccount(api) {
  if (api.consts?.treasury?.potAccount) {
    return api.consts?.treasury?.potAccount?.toString();
  }

  const pallet = "treasury";
  const treasuryAccount = u8aConcat(
    "modl",
    api?.consts[pallet] && api.consts[pallet].palletId
      ? api.consts[pallet].palletId.toU8a(true)
      : "py/trsry",
    EMPTY_U8A_32,
  ).subarray(0, 32);
  return api.registry.createType("AccountId", treasuryAccount).toString();
}

(async () => {
  // const api = await getCommonApi("wss://kusama-rpc.polkadot.io");
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const blockHeight = 28252800;
  const blockApi = await findBlockApiByHeight(blockHeight, api);
  const acc = getTreasuryAccount(blockApi);
  console.log(acc);
  process.exit(0)
})();
