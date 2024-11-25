const { Web3 } = require('web3');

(async () => {
  // private RPC endpoint
  const web3 = new Web3('https://rpc.opensquare.laos.laosnetwork.io/');

  const num = await web3.eth.getBlockNumber();
  const block = await web3.eth.getBlock(940494, true);

  const txHash = "0xcd877f6c36be86267072302ecd04c01f9a1dcf67e35545e3acfebb9d9891e598";
  const receipt = await web3.eth.getTransactionReceipt(txHash);
  console.log(num);
// ↳ 18849658n
})();
