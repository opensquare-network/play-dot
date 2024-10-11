const { findBlockApiByHeight } = require("../../common/blockHash");
const { getApi } = require("../api");

async function hasIdentityPallet(api, height) {
  const blockApi = await findBlockApiByHeight(height, api);
  return !!blockApi.query.identity;
}

async function find() {
  const api = await getApi();
  let start = 188889, end = 25084032;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const yes = await hasIdentityPallet(api, middle);
    if (yes) {
      start = middle;
    } else {
      end = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }
}

async function check() {
  const api = await getApi();
  // const height = 22688067;
  const height = 23780225;
  const yes = await hasIdentityPallet(api, height);
  console.log(`${height} has identity`, yes);
}

;(async () => {
  // await find();
  await check();

  process.exit(0);
})();
