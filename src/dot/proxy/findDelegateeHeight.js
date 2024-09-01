const { getApi } = require("../api");
const { findBlockHash } = require("../../common/blockHash");

const delegator = "13jvcuoWygGzjHBNd2nadWq8dVBhxJtEoCBzENWrkP1AaD8u";
const delegatee = "14orvYYftcqvEe24G4ATi3un9nD4Mq6aa9JdTVNRPbETiRHT";
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
      const [addrBytes, proxyType] = item;
      if (addrBytes.toString() === delegatee && proxyType.toString() === type) {
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

  let start = 21306520, end = 22341488;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const yes = await isDelegatee(api, middle);
    if (yes) {
      start = middle;
    } else {
      end = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  process.exit(0);
})();
