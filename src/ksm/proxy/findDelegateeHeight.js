const { getApi } = require("../api");
const { findBlockHash } = require("../../common/blockHash");

const delegator = "FWKXyqL8YhH7fyazuFiGswDcQEvJNSnbSVjc6mFDGL5i342";
const delegatee = "H1tAQMm3eizGcmpAhL9aA9gR844kZpQfkU7pkmMiLx9jSzE";
const type = "Any";

async function isDelegatee(api, height) {
  const blockHash = await findBlockHash(height, api);
  const blockApi = await api.at(blockHash);
  let proxies;
  try {
    proxies = await blockApi.query.proxy.proxies(delegator);
  } catch (e) {
    return true;
  }
  if (!proxies || !Array.isArray(proxies)) {
    return false;
  }

  const arr = proxies[0];
  for (const item of arr) {
    if (item.delegate && item.delegate.toString() === delegatee && item.proxyType.toString() === type) {
      return true;
    }

    if (Array.isArray(item)) {
      const [addrBytes] = item;
      if (addrBytes.toString() === delegatee) {
        return true;
      }
    }
  }

  return false;
}

(async () => {
  const api = await getApi();
  // const height = 760000;
  // const height = 700000;

  // const is = await isDelegatee(api, height);
  // console.log(`is delegatee ${is}`);

  let start = 14359985, end = 24747495;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const yes = await isDelegatee(api, middle);
    if (yes) {
      start = middle;
      console.log(`${ middle } is delegatee`);
    } else {
      end = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  process.exit(0);
})();
