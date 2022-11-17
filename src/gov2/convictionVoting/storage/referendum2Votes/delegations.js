import { extractAddressAndTrackId } from "../votingFor/key";

/**
 * A -> B -> C(direct voter)
 */
export default function extractDelegations(trackEntries, api) {
  const delegatingEntries = trackEntries.filter(([, votingOf]) => votingOf.isDelegating);
  const delegations = delegatingEntries.map(([storageKey, votingOf]) => {
    const { address } = extractAddressAndTrackId(storageKey, api);
    return {
      address,
      delegating: votingOf.asDelegating,
    }
  })

  delegatingEntries.map(([storageKey, votingOf]) => {
    const { address } = extractAddressAndTrackId(storageKey, api);
    const delegating = votingOf.asDelegating;
    const target = delegating.target.toString();

    const delegation = delegations.find(d => d.address === target);
    const delegatedAddress = delegation ? delegation.address : target;

  })
}

module.exports = {
  extractDelegations,
}
