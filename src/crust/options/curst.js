const spec = {
  "spec": {
    "crust": {
      "alias": {},
      "rpc": {},
      "types": [
        {
          "minmax": [
            1,
            2
          ],
          "types": {
            "DispatchErrorModule": "DispatchErrorModuleU8",
            "AccountInfo": "AccountInfoWithProviders",
            "Address": "AccountId",
            "AddressInfo": "Vec<u8>",
            "LookupSource": "AccountId",
            "Group": {
              "members": "BTreeSet<AccountId>",
              "allowlist": "BTreeSet<AccountId>"
            },
            "IASSig": "Vec<u8>",
            "Identity": {
              "anchor": "SworkerAnchor",
              "punishment_deadline": "u64",
              "group": "Option<AccountId>"
            },
            "ISVBody": "Vec<u8>",
            "MerkleRoot": "Vec<u8>",
            "ReportSlot": "u64",
            "PKInfo": {
              "code": "SworkerCode",
              "anchor": "Option<SworkerAnchor>"
            },
            "SworkerAnchor": "Vec<u8>",
            "SworkerCert": "Vec<u8>",
            "SworkerCode": "Vec<u8>",
            "SworkerPubKey": "Vec<u8>",
            "SworkerSignature": "Vec<u8>",
            "EraBenefits": {
              "total_fee_reduction_quota": "Compact<Balance>",
              "total_market_active_funds": "Compact<Balance>",
              "used_fee_reduction_quota": "Compact<Balance>",
              "active_era": "Compact<EraIndex>"
            },
            "FundsType": {
              "_enum": [
                "SWORK",
                "MARKET"
              ]
            },
            "FundsUnlockChunk": {
              "value": "Compact<Balance>",
              "era": "Compact<EraIndex>"
            },
            "MarketBenefit": {
              "total_funds": "Compact<Balance>",
              "active_funds": "Compact<Balance>",
              "used_fee_reduction_quota": "Compact<Balance>",
              "file_reward": "Compact<Balance>",
              "refreshed_at": "Compact<EraIndex>",
              "unlocking_funds": "Vec<FundsUnlockChunk<Balance>>"
            },
            "SworkBenefit": {
              "total_funds": "Compact<Balance>",
              "active_funds": "Compact<Balance>",
              "total_fee_reduction_count": "u32",
              "used_fee_reduction_count": "u32",
              "refreshed_at": "Compact<EraIndex>",
              "unlocking_funds": "Vec<FundsUnlockChunk<Balance>>"
            },
            "ETHAddress": "Vec<u8>",
            "EthereumTxHash": "H256",
            "Lock": {
              "total": "Compact<Balance>",
              "last_unlock_at": "BlockNumber",
              "lock_type": "LockType"
            },
            "LockType": {
              "delay": "BlockNumber",
              "lock_period": "u32"
            },
            "Guarantee": {
              "targets": "Vec<IndividualExposure<AccountId, Balance>>",
              "total": "Compact<Balance>",
              "submitted_in": "EraIndex",
              "suppressed": "bool"
            },
            "ValidatorPrefs": {
              "guarantee_fee": "Compact<Perbill>"
            },
            "BridgeChainId": "u8",
            "ChainId": "u8",
            "ResourceId": "H256",
            "DepositNonce": "u64",
            "ProposalStatus": {
              "_enum": [
                "Initiated",
                "Approved",
                "Rejected"
              ]
            },
            "ProposalVotes": {
              "votes_for": "Vec<AccountId>",
              "votes_against": "Vec<AccountId>",
              "status": "ProposalStatus",
              "expiry": "BlockNumber"
            },
            "Erc721Token": {
              "id": "TokenId",
              "metadata": "Vec<u8>"
            },
            "TokenId": "U256",
            "FileInfo": {
              "file_size": "u64",
              "expired_on": "BlockNumber",
              "calculated_at": "BlockNumber",
              "amount": "Balance",
              "prepaid": "Balance",
              "reported_replica_count": "u32",
              "replicas": "Vec<Replica<AccountId>>"
            },
            "MerchantLedger": {
              "reward": "Balance",
              "collateral": "Balance"
            },
            "Releases": {
              "_enum": [
                "V1_0_0",
                "V2_0_0"
              ]
            },
            "Replica": {
              "who": "AccountId",
              "valid_at": "BlockNumber",
              "anchor": "SworkerAnchor",
              "is_reported": "bool"
            },
            "Status": {
              "_enum": [
                "Free",
                "Reserved"
              ]
            },
            "UsedInfo": {
              "used_size": "u64",
              "reported_group_count": "u32",
              "groups": "BTreeMap<SworkerAnchor, bool>"
            },
            "FeeReductionBenefit": {
              "funds": "Balance",
              "total_fee_reduction_count": "u32",
              "used_fee_reduction_quota": "Balance",
              "used_fee_reduction_count": "u32",
              "refreshed_at": "EraIndex"
            },
            "WorkReport": {
              "report_slot": "u64",
              "used": "u64",
              "free": "u64",
              "reported_files_size": "u64",
              "reported_srd_root": "MerkleRoot",
              "reported_files_root": "MerkleRoot"
            }
          }
        },
        {
          "minmax": [
            3,
            16
          ],
          "types": {
            "DispatchErrorModule": "DispatchErrorModuleU8",
            "AccountInfo": "AccountInfoWithProviders",
            "Address": "AccountId",
            "AddressInfo": "Vec<u8>",
            "LookupSource": "AccountId",
            "Group": {
              "members": "BTreeSet<AccountId>",
              "allowlist": "BTreeSet<AccountId>"
            },
            "IASSig": "Vec<u8>",
            "Identity": {
              "anchor": "SworkerAnchor",
              "punishment_deadline": "u64",
              "group": "Option<AccountId>"
            },
            "ISVBody": "Vec<u8>",
            "MerkleRoot": "Vec<u8>",
            "ReportSlot": "u64",
            "PKInfo": {
              "code": "SworkerCode",
              "anchor": "Option<SworkerAnchor>"
            },
            "SworkerAnchor": "Vec<u8>",
            "SworkerCert": "Vec<u8>",
            "SworkerCode": "Vec<u8>",
            "SworkerPubKey": "Vec<u8>",
            "SworkerSignature": "Vec<u8>",
            "EraBenefits": {
              "total_fee_reduction_quota": "Compact<Balance>",
              "total_market_active_funds": "Compact<Balance>",
              "used_fee_reduction_quota": "Compact<Balance>",
              "active_era": "Compact<EraIndex>"
            },
            "FundsType": {
              "_enum": [
                "SWORK",
                "MARKET"
              ]
            },
            "FundsUnlockChunk": {
              "value": "Compact<Balance>",
              "era": "Compact<EraIndex>"
            },
            "MarketBenefit": {
              "total_funds": "Compact<Balance>",
              "active_funds": "Compact<Balance>",
              "used_fee_reduction_quota": "Compact<Balance>",
              "file_reward": "Compact<Balance>",
              "refreshed_at": "Compact<EraIndex>",
              "unlocking_funds": "Vec<FundsUnlockChunk<Balance>>"
            },
            "SworkBenefit": {
              "total_funds": "Compact<Balance>",
              "active_funds": "Compact<Balance>",
              "total_fee_reduction_count": "u32",
              "used_fee_reduction_count": "u32",
              "refreshed_at": "Compact<EraIndex>",
              "unlocking_funds": "Vec<FundsUnlockChunk<Balance>>"
            },
            "ETHAddress": "Vec<u8>",
            "EthereumTxHash": "H256",
            "Lock": {
              "total": "Compact<Balance>",
              "last_unlock_at": "BlockNumber",
              "lock_type": "LockType"
            },
            "LockType": {
              "delay": "BlockNumber",
              "lock_period": "u32"
            },
            "Guarantee": {
              "targets": "Vec<IndividualExposure<AccountId, Balance>>",
              "total": "Compact<Balance>",
              "submitted_in": "EraIndex",
              "suppressed": "bool"
            },
            "ValidatorPrefs": {
              "guarantee_fee": "Compact<Perbill>"
            },
            "BridgeChainId": "u8",
            "ChainId": "u8",
            "ResourceId": "H256",
            "DepositNonce": "u64",
            "ProposalStatus": {
              "_enum": [
                "Initiated",
                "Approved",
                "Rejected"
              ]
            },
            "ProposalVotes": {
              "votes_for": "Vec<AccountId>",
              "votes_against": "Vec<AccountId>",
              "status": "ProposalStatus",
              "expiry": "BlockNumber"
            },
            "Erc721Token": {
              "id": "TokenId",
              "metadata": "Vec<u8>"
            },
            "TokenId": "U256",
            "FileInfo": {
              "file_size": "u64",
              "spower": "u64",
              "expired_at": "BlockNumber",
              "calculated_at": "BlockNumber",
              "amount": "Compact<Balance>",
              "prepaid": "Compact<Balance>",
              "reported_replica_count": "u32",
              "replicas": "Vec<Replica<AccountId>>"
            },
            "Replica": {
              "who": "AccountId",
              "valid_at": "BlockNumber",
              "anchor": "SworkerAnchor",
              "is_reported": "bool",
              "created_at": "Option<BlockNumber>"
            },
            "WorkReport": {
              "report_slot": "u64",
              "spower": "u64",
              "free": "u64",
              "reported_files_size": "u64",
              "reported_srd_root": "MerkleRoot",
              "reported_files_root": "MerkleRoot"
            }
          }
        },
        {
          "minmax": [
            17,
            null
          ],
          "types": {
            "DispatchErrorModule": "DispatchErrorModuleU8",
            "AccountInfo": "AccountInfoWithProviders",
            "Address": "AccountId",
            "AddressInfo": "Vec<u8>",
            "LookupSource": "AccountId",
            "Group": {
              "members": "BTreeSet<AccountId>",
              "allowlist": "BTreeSet<AccountId>"
            },
            "IASSig": "Vec<u8>",
            "Identity": {
              "anchor": "SworkerAnchor",
              "punishment_deadline": "u64",
              "group": "Option<AccountId>"
            },
            "ISVBody": "Vec<u8>",
            "MerkleRoot": "Vec<u8>",
            "ReportSlot": "u64",
            "PKInfo": {
              "code": "SworkerCode",
              "anchor": "Option<SworkerAnchor>"
            },
            "SworkerAnchor": "Vec<u8>",
            "SworkerCert": "Vec<u8>",
            "SworkerCode": "Vec<u8>",
            "SworkerPubKey": "Vec<u8>",
            "SworkerSignature": "Vec<u8>",
            "EraBenefits": {
              "total_fee_reduction_quota": "Compact<Balance>",
              "total_market_active_funds": "Compact<Balance>",
              "used_fee_reduction_quota": "Compact<Balance>",
              "active_era": "Compact<EraIndex>"
            },
            "FundsType": {
              "_enum": [
                "SWORK",
                "MARKET"
              ]
            },
            "FundsUnlockChunk": {
              "value": "Compact<Balance>",
              "era": "Compact<EraIndex>"
            },
            "MarketBenefit": {
              "total_funds": "Compact<Balance>",
              "active_funds": "Compact<Balance>",
              "used_fee_reduction_quota": "Compact<Balance>",
              "file_reward": "Compact<Balance>",
              "refreshed_at": "Compact<EraIndex>",
              "unlocking_funds": "Vec<FundsUnlockChunk<Balance>>"
            },
            "SworkBenefit": {
              "total_funds": "Compact<Balance>",
              "active_funds": "Compact<Balance>",
              "total_fee_reduction_count": "u32",
              "used_fee_reduction_count": "u32",
              "refreshed_at": "Compact<EraIndex>",
              "unlocking_funds": "Vec<FundsUnlockChunk<Balance>>"
            },
            "ETHAddress": "Vec<u8>",
            "EthereumTxHash": "H256",
            "Lock": {
              "total": "Compact<Balance>",
              "last_unlock_at": "BlockNumber",
              "lock_type": "LockType"
            },
            "LockType": {
              "delay": "BlockNumber",
              "lock_period": "u32"
            },
            "Guarantee": {
              "targets": "Vec<IndividualExposure<AccountId, Balance>>",
              "total": "Compact<Balance>",
              "submitted_in": "EraIndex",
              "suppressed": "bool"
            },
            "ValidatorPrefs": {
              "guarantee_fee": "Compact<Perbill>"
            },
            "BridgeChainId": "u8",
            "ChainId": "u8",
            "ResourceId": "H256",
            "DepositNonce": "u64",
            "ProposalStatus": {
              "_enum": [
                "Initiated",
                "Approved",
                "Rejected"
              ]
            },
            "ProposalVotes": {
              "votes_for": "Vec<AccountId>",
              "votes_against": "Vec<AccountId>",
              "status": "ProposalStatus",
              "expiry": "BlockNumber"
            },
            "Erc721Token": {
              "id": "TokenId",
              "metadata": "Vec<u8>"
            },
            "TokenId": "U256",
            "FileInfo": {
              "file_size": "u64",
              "spower": "u64",
              "expired_at": "BlockNumber",
              "calculated_at": "BlockNumber",
              "amount": "Compact<Balance>",
              "prepaid": "Compact<Balance>",
              "reported_replica_count": "u32",
              "replicas": "Vec<Replica<AccountId>>"
            },
            "Replica": {
              "who": "AccountId",
              "valid_at": "BlockNumber",
              "anchor": "SworkerAnchor",
              "is_reported": "bool",
              "created_at": "Option<BlockNumber>"
            },
            "FileInfoV2": {
              "file_size": "u64",
              "spower": "u64",
              "expired_at": "BlockNumber",
              "calculated_at": "BlockNumber",
              "amount": "Compact<Balance>",
              "prepaid": "Compact<Balance>",
              "reported_replica_count": "u32",
              "remaining_paid_count": "u32",
              "replicas": "BTreeMap<AccountId, Replica<AccountId>>"
            },
            "WorkReport": {
              "report_slot": "u64",
              "spower": "u64",
              "free": "u64",
              "reported_files_size": "u64",
              "reported_srd_root": "MerkleRoot",
              "reported_files_root": "MerkleRoot"
            }
          }
        }
      ]
    }
  }
}

const crustOptions = {
  typesBundle: {
    ...spec,
  }
}

module.exports = {
  crustOptions,
}
