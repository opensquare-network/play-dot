const { getApi } = require("../api");
const { findBlockHash } = require("../../common/blockHash");

const delegator = "15ubZj6T7NUYyQw6j4XBkEMJ2vew5w9kqKEcN1QG7Z1weKDV";
const delegatee = "13znFMMjHyM2UvSewvaKMC2bLUcySRMzcM8BAMTzm1G2P5ju";
const type = "Governance";

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

  let start = 188889, end = 23573874;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const yes = await isDelegatee(api, middle);
    if (yes) {
      end = middle;
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }

  console.log("finished");
  process.exit(0);
})();
