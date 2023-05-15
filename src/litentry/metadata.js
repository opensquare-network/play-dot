const { findBlockHash } = require("../common/blockHash");
const { getApi } = require("./api");

async function main() {
  const api = await getApi();

  const height = 2040270;
  const blockHash = await findBlockHash(height, api);

  const metadata = await api.rpc.state.getMetadata(blockHash);
  console.log("metadata", metadata);
  process.exit(0);
}

main().then(console.log)
