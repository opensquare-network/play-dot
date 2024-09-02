const { getApi } = require("../api");
const { findBlockHash } = require("../../common/blockHash");

const delegator = "1KvKReVmUiTc2LW2a4qyHsaJJ9eE9LRsywZkMk5hyBeyHgw";
const delegatee = "14TKt6bUNjKJdfYqVDNFBqzDAwmJ7WaQwfUmxmizJHHrr1Gs";
const type = "UnusedSudoBalances";

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

  let start = 188889, end = 22356048;
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
