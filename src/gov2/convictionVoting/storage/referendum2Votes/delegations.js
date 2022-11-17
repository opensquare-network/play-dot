import { extractAddressAndTrackId } from "../votingFor/key";

/**
 * A -> B -> C(direct voter)
 */
export default function extractDelegations(trackEntries, api, directVotes = []) {
  const delegatingEntries = trackEntries.filter(([, votingOf]) => votingOf.isDelegating);
  const delegations = delegatingEntries.map(([storageKey, votingOf]) => {
    const { address } = extractAddressAndTrackId(storageKey, api);
    return {
      address,
      delegating: votingOf.asDelegating,
    }
  })

  return delegatingEntries.reduce((result, [storageKey, votingOf]) => {
    const { address } = extractAddressAndTrackId(storageKey, api);
    const delegating = votingOf.asDelegating;
    const target = delegating.target.toString();

    const delegation = delegations.find(d => d.address === target);
    const delegatedAddress = delegation ?
      delegation.address : // fixme: I think we should use delegation.target
      target;

    const to = directVotes.find(({ address }) => address === delegatedAddress);
    if (to) {
      result.push({
        address,
        isDelegating: true,
        aye: to.aye,
        balance: delegating.balance.toString(),
        conviction: delegating.conviction.toNumber(),
      });
    }
  }, []);
}

module.exports = {
  extractDelegations,
}
