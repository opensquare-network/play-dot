function consoleEntries(entries) {
  for (const [storageKey, optionalStorage] of entries) {
    const who = storageKey.args[0].toString();
    if (!optionalStorage.isSome) {
      return;
    }

    const storage = optionalStorage.unwrap();
    const schedules = storage.toJSON();

    console.log(who, schedules);
  }
}

module.exports = {
  consoleEntries,
}
