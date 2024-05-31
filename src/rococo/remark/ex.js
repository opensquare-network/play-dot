require("dotenv").config();
const { getApi } = require("../api");
const { Keyring } = require("@polkadot/keyring");
const { cryptoWaitReady } = require("@polkadot/util-crypto");

async function getAccount() {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519' });
  return keyring.addFromMnemonic(process.env.mnemonic);
}

;(async () => {
  const api = await getApi();
  const account = await getAccount();

  const unsub = await api.tx.system.remark("hello world").signAndSend(account, (result) => {
    console.log(`Current status is ${ result.status }`);

    if (result.status.isInBlock) {
      console.log(`Transaction included at blockHash ${ result.status.asInBlock }`);
    } else if (result.status.isFinalized) {
      console.log(`Transaction finalized at blockHash ${ result.status.asFinalized }`);
      unsub();
    }
  });
})();
