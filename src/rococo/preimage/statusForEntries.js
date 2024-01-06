const { getApi } = require("../api");

function logStatusFor(rawStatus, hash) {
  if (!rawStatus.isSome) {
    console.log(`Preimage status of ${ hash } not found`);
  }

  const status = rawStatus.unwrap();
  if (status.isRequested) {
    const requestedValue = status.asRequested;
    const optionDeposit = requestedValue.deposit;
    const optionLen = requestedValue.len;
    if (optionLen.isSome) {
      console.log("hash", hash, "len", optionLen.unwrap().toNumber());
    }
  }

  if (status.isUnrequested) {
    const unRequestedValue = status.asUnrequested;
    console.log("hash", hash, "len", unRequestedValue.len.toNumber());
  }
}

;(async () => {
  const api = await getApi();
  const entries = await api.query.preimage.statusFor.entries();
  for (const [storageKey, rawStatus] of entries) {
    const hash = storageKey.args[0].toString();
    logStatusFor(rawStatus, hash);
  }

  console.log("finished");

  process.exit(0);
})();
