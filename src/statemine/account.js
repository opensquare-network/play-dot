const { getApi } = require("./api")
const { u8aToHex } = require("@polkadot/util")

async function main() {
  const api = await getApi();
  // const blockHash = await api.rpc.chain.getBlockHash(1428787);
  const entries = await api.query.system.account.entriesPaged({
    args: [],
    pageSize: 100,
    startKey: '0x26aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e8886371da901ab47468fb55dff5e2aeba2d9dc214f5c18b340d0236aa100225d4592861cd6e053b62f18bbbdf86aba1f9e67c692fd'
  })

  console.log(u8aToHex(entries[0][0].slice(48)))
  console.log(entries)
}

main()
