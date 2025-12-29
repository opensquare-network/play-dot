const { getCommonApi } = require("../common/api");
const { hexToString } = require("@polkadot/util")
const trim = require("lodash.trim");

function positiveOr0(v = 0) {
  return v > 0 ? v : 0;
}

async function getCurrencyLockedByVesting(api, account) {
  const rawStorage = await api.query.balances.locks(account);
  console.log("rawStorage", rawStorage);
  const vestingLock = rawStorage.find(item => trim(hexToString(item.id.toHex())) === "vesting");
  if (vestingLock) {
    return vestingLock.amount.toBigInt();
  }
  return 0n;
}

async function getVestingInfo(api, account) {
  const optionalStorage = await api?.query?.vesting?.vesting(account);
  const relayBlockNumber = await api.query.parachainSystem.lastRelayChainBlockNumber();
  const nowHeightBigInt = relayBlockNumber.toBigInt();
  if (optionalStorage.isNone) {
    console.log(`No vesting info for ${account}`);
    return;
  }

  const rawSchedules = optionalStorage.unwrap();
  let totalLockedAt = 0n;
  let totalToUnlock = 0n;
  let totalVesting = 0n;
  for (const rawSchedule of rawSchedules) {
    const vestedBlockCount = positiveOr0(nowHeightBigInt - rawSchedule.startingBlock.toBigInt());
    const perBlock = rawSchedule.perBlock.toBigInt();
    const unlockableNow = vestedBlockCount * perBlock;
    const locked = rawSchedule.locked.toBigInt();
    const lockedNow = locked - unlockableNow;
    totalToUnlock = totalToUnlock + unlockableNow;
    totalLockedAt = totalLockedAt + lockedNow;
    totalVesting = totalVesting + locked;
  }

  return {
    totalLockedNow: totalLockedAt,
    totalToUnlock,
    totalVesting,
  };
}

(async () => {
  const api = await getCommonApi("wss://polkadot-asset-hub-rpc.polkadot.io");
  const account = "155q5JBGSW1BhQmntD95mCXcbcjBFzni1HnudteHPuzyJGG8";
  const info = await getVestingInfo(api, account);
  if (!info) {
    console.log(`No vesting info for ${account}`);
    process.exit(0);
  }

  const {
    totalLockedNow, // it means how much is in lock status by vesting
    totalToUnlock, // it means how much can be unlocked in total
    totalVesting, // total balance by vesting
  } = info;

  const currencyLocked = await getCurrencyLockedByVesting(api, account);
  const unlockableNow = currencyLocked - totalLockedNow;

  console.log("unlockableNow", unlockableNow);

  process.exit(0);
})();
