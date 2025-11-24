const { getCommonApi } = require("../common/api");

let objIdMap = new WeakMap, objectCount = 0;

function objectId(object) {
  if (!objIdMap.has(object)) objIdMap.set(object, ++objectCount);
  return objIdMap.get(object);
}

(async () => {
  const api = await getCommonApi("wss://rpc.polkadot.io");
  const blockApi = await api.at("0x13cdd7002928165a91b542b2a6d97c6d82912a92edcdd8b1e6c054c8f9a64bb5");
  // const header = await api.rpc.chain.getHeader();
  //
  // console.log(header);
  console.log(objectId(api._rpcCore.provider));
  console.log(objectId(blockApi._rpcCore.provider));
  process.exit(0);
})();
