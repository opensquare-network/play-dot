const { getApi } = require("../api");
const BigNumber = require("bignumber.js");
const { encodeAddress } = require("@polkadot/util-crypto");

let allDelegations = null;

function getMultiplier(conviction) {
  if (conviction.isNone) {
    return 0.1;
  } else if (conviction.isLocked1x) {
    return 1;
  } else if (conviction.isLocked2x) {
    return 2;
  } else if (conviction.isLocked3x) {
    return 3;
  } else if (conviction.isLocked4x) {
    return 4;
  } else if (conviction.isLocked5x) {
    return 5;
  } else if (conviction.isLocked6x) {
    return 6;
  }

  return 1;
}

async function getAllDelegations(blockApi, update = false) {
  if (allDelegations && !update) {
    return allDelegations;
  }

  const delegations = await blockApi.query.democracy.delegations.entries();
  let result = [];
  for (const [key, [delegate, conviction]] of delegations) {
    const delegator = encodeAddress(key.slice(40), 2);
    result.push({
      delegator,
      delegate: delegate.toString(),
      conviction,
    })
  }

  return result;
}

async function getDelegationTally(referendumIndex, to, minConviction, recursionLimit, blockApi, voters = []) {
  if (recursionLimit <= 0) {
    return {
      votes: 0,
      capital: 0,
    };
  }

  let totalVotes = 0;
  let totalCapital = 0;

  const delegations = await getAllDelegations(blockApi);
  for (const { delegator, delegate, conviction } of delegations) {
    if (delegate !== to) {
      continue;
    }

    if (voters.includes(delegator)) {
      continue
    }

    let finalConviction = conviction;
    if (minConviction.toNumber() <= finalConviction.toNumber()) {
      finalConviction = minConviction;
    }

    const account = await blockApi.query.system.account(delegator);
    const total = new BigNumber(account.data.free.toString()).plus(account.data.reserved.toString());

    const power = total.multipliedBy(getMultiplier(finalConviction)).toFixed(0);
    const { votes: delVotes, capital: delCapital } = await getDelegationTally(
      referendumIndex,
      delegator,
      finalConviction,
      recursionLimit - 1,
      blockApi,
      voters,
    );

    totalVotes = new BigNumber(totalVotes)
      .plus(power)
      .plus(delVotes)
      .toString();
    totalCapital = new BigNumber(totalCapital)
      .plus(total)
      .plus(delCapital)
      .toString();
  }

  return {
    votes: totalVotes,
    capital: totalCapital,
  }
}

async function getTally(referendumIndex, blockApi, registry) {
  const rawVoters = await blockApi.query.democracy.votersFor(referendumIndex);

  let ayes = 0;
  let nays = 0;
  let turnout = 0;
  const voters = rawVoters.toJSON();
  for (const voter of voters) {
    const account = await blockApi.query.system.account(voter);
    const total = new BigNumber(account.data.free.toString()).plus(account.data.reserved.toString());

    const vote = await blockApi.query.democracy.voteOf([referendumIndex, voter]);
    console.log('voter', voter, total.toString(), vote.conviction.toNumber());
    const power = total.multipliedBy(getMultiplier(vote.conviction)).toFixed(0);
    const {votes: delPower, capital: delCapital} = await getDelegationTally(
      referendumIndex,
      voter,
      vote.conviction,
      16,
      blockApi,
      voters
    );
    console.log('del p', delPower, 'del capital', delCapital);

    turnout = new BigNumber(turnout).plus(total).plus(delCapital).toString();
    if (vote.isAye) {
      ayes = new BigNumber(ayes).plus(power).plus(delPower).toString();
    } else {
      nays = new BigNumber(nays).plus(power).plus(delPower).toString();
    }
  }

  return {
    ayes,
    nays,
    turnout,
  }
}

;(async () => {
  const api = await getApi();
  const height = 1574000;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const tally = await getTally(42, blockApi, api.registry);
  console.log(tally);

  process.exit(0);
})();
