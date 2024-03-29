const { getApi } = require("../api");

function objectSpread(dest, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    const src = sources[i];

    if (src) {
      Object.assign(dest, src);
    }
  }

  return dest;
}


function normalizeEntry([storageKey, voting], blockApi) {
  let pubKeyU8a;
  if (storageKey.length === 72) {
    pubKeyU8a = storageKey.slice(40);
  }
  if (!pubKeyU8a) {
    throw new Error(`Unexpected storage key length ${ storageKey.length }`)
  }

  const accountId = blockApi.registry.createType("AccountId", pubKeyU8a);
  const account = accountId.toString();
  return { account, voting };
}

function extractVotes(mapped, targetReferendumIndex, blockApi) {
  return mapped.filter(({ voting }) => voting.isDirect)
    .map(({ account, voting }) => {
      return {
        account,
        votes: voting.asDirect.votes.filter(([idx]) => idx.eq(targetReferendumIndex)),
      }
    })
    .filter(({ votes }) => votes.length > 0)
    .map(({ account, votes }) => {
      return {
        account,
        vote: votes[0][1],
      }
    })
    .reduce((result, { account, vote }) => {
      console.log('vote', vote);
      // FIXME We are ignoring split votes
      if (vote.isStandard) {
        const standard = vote.asStandard;
        const balance = standard.balance.toBigInt().toString();
        const vote = standard.vote;
        result.push(
          objectSpread({
            account,
            isDelegating: false
          }, {
            balance,
            vote,
          })
        );
      }

      return result;
    }, [])
}

function extractDelegations(mapped, directVotes = [], blockApi) {
  const delegations = mapped.filter(({ voting }) => voting.isDelegating)
    .map(({ account, voting }) => {
        return {
          account,
          delegating: voting.asDelegating,
        }
      }
    )

  let newVotes = [];
  delegations.forEach(({ account, delegating: { balance, conviction, target } }) => {
    const toDelegator = delegations.find(({ account }) => account === target.toString());
    const to = directVotes.find(({ account }) => account === (toDelegator ? toDelegator.account : target.toString()));

    if (to) {
      newVotes.push({
        account,
        balance: balance.toBigInt().toString(),
        isDelegating: true,
        vote: blockApi.registry.createType('Vote', { aye: to.vote.isAye, conviction })
      })
    }
  })

  return newVotes;
}

;(async () => {
  const api = await getApi();
  const height = 13910400;
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const voting = await blockApi.query.democracy.votingOf.entries();
  const mapped = voting.map(item => normalizeEntry(item, blockApi));
  const targetReferendumIndex = 218;
  // const directVotes = extractVotes(mapped, targetReferendumIndex, blockApi);
  const directVotes = [];
  const votesViaDelegating = extractDelegations(mapped, directVotes, blockApi);

  const referendumVotes = [...directVotes, ...votesViaDelegating];
  console.log(referendumVotes);

  process.exit(0)
})()
