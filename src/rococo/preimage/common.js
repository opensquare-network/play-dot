
function logRawStatus(rawStatus, hash) {
  if (!rawStatus.isSome) {
    console.log(`Preimage status of ${ hash } not found`);
  }

  const status = rawStatus.unwrap();
  if (status.isRequested) {
    const requestedValue = status.asRequested;
    const maybeTicket = requestedValue.maybeTicket;
    let depositor, deposit;
    if (maybeTicket.isSome) {
      const ticket = maybeTicket.unwrap();
      depositor = ticket[0].toString();
      deposit = ticket[1].toJSON();
    }

    let len;
    const maybeLen = requestedValue.maybeLen;
    if (maybeLen.isSome) {
      len = maybeLen.unwrap().toNumber();
    }

    console.log("hash", hash, "depositor", depositor, "deposit", deposit, "len", len);
  }

  if (status.isUnrequested) {
    const unRequestedValue = status.asUnrequested;
    const depositor = unRequestedValue.ticket[0].toString();
    const deposit = unRequestedValue.ticket[1].toJSON();
    const len = unRequestedValue.len.toNumber();
    console.log("hash", hash, "depositor", depositor, "deposit", deposit, "len", len);
  }
}

module.exports = {
  logRawStatus,
}
