require("dotenv").config();
const { Keyring } = require("@polkadot/keyring");
const { cryptoWaitReady } = require("@polkadot/util-crypto");

;(async () => {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519' });
  keyring.setSS58Format(0); // this would be used
  const account = keyring.addFromMnemonic(process.env.mnemonic);
  console.log(account.address);
})()
