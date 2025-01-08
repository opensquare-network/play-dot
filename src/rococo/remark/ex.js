require("dotenv").config();
const { getApi } = require("../api");
const { Keyring } = require("@polkadot/keyring");
const { cryptoWaitReady } = require("@polkadot/util-crypto");

async function getAccount() {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519' });
  return keyring.addFromMnemonic(process.env.mnemonic);
}

function extractBlockTime(extrinsics) {
  const setTimeExtrinsic = extrinsics.find(
    (ex) => ex.method.section === "timestamp" && ex.method.method === "set"
  );
  if (setTimeExtrinsic) {
    const { args } = setTimeExtrinsic.method.toJSON();
    return args.now;
  }
}

function getBlockIndexer(block) {
  const blockHash = block.hash.toHex();
  const blockHeight = block.header.number.toNumber();
  const blockTime = extractBlockTime(block.extrinsics);

  return {
    blockHeight,
    blockHash,
    blockTime,
  };
}

;(async () => {
  const api = await getApi();
  const account = await getAccount();

  let blockHash;
  api.tx.system.remark("hello world").signAndSend(account, async (result) => {
    console.log(`Current status is ${ result.status }`);

    if (result.status.isInBlock) {
      console.log(`Transaction included at blockHash ${ result.status.asInBlock }`);
      blockHash = result.status.asInBlock.toString();
    } else if (result.status.isFinalized) {
      console.log(`Transaction finalized at blockHash ${ result.status.asFinalized }`);
      const blockHeight = result.blockNumber.toNumber();
      const blockHash = result.status.asFinalized.toString();
      const extrinsicIndex = result.txIndex;
      const indexer = {
        blockHeight,
        blockHash,
        extrinsicIndex,
      };
      console.log(indexer);
    }
  });
})();
