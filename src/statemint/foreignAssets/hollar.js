const { getCommonApi } = require("../../common/api");
const { findBlockApiByHeight } = require("../../common/blockHash");

const HYDRATION_ASSET_IDS = {
  DOT: 5,
  HOLLAR: 222,
};

const HOLLAR_FOREIGN_ASSET_KEY = {
  parents: 1,
  interior: {
    X2: [{ Parachain: 2034 }, { GeneralIndex: HYDRATION_ASSET_IDS.HOLLAR }],
  },
};

const StatemintFellowShipTreasuryAccount =
  "16VcQSRcMFy6ZHVjBvosKmo7FKqTb8ZATChDYo8ibutzLnos";

async function getBalance(api, height) {
  const blockApi = await findBlockApiByHeight(height, api);
  const foreignAsset = await blockApi?.query?.foreignAssets?.account(HOLLAR_FOREIGN_ASSET_KEY, StatemintFellowShipTreasuryAccount);
  if (foreignAsset.isSome) {
    return foreignAsset.unwrap().balance.toBigInt();
  } else {
    return 0n;
  }
}

async function hasBalance(api, height) {
  const bigValue = await getBalance(api, height);
  return bigValue > 0n;
}

async function find(api) {
  let start = 14876894, end = 16582866;
  while (start < end - 1) {
    let middle = parseInt((start + end) / 2);
    const bigValue = await getBalance(api, middle);
    if (bigValue > 0n) {
      end = middle;
      console.log(`${middle} has balance ${bigValue.toString()}`);
    } else {
      start = middle;
    }

    console.log("start", start, "end", end, "middle", middle);
  }
}

(async () => {
  const api = await getCommonApi("wss://polkadot-asset-hub-rpc.polkadot.io");
  await find(api);

  process.exit(0);
})();
