// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './Structs.sol';

library PassingSecretInfoStructs {
  struct SecretInfo {
    uint256 id;
    address owner_address;
    // amount in WEI
    uint256 amount;
    string title;
    string description;
    string zero_knowledge_proof;
    uint256 max_uses;
    uint256 current_uses;
    uint256 created_at;
    Structs.Reply[] replies;
    Structs.Rate[] rates;
  }

  struct SecretInfoAccessedResponse {
    SecretInfo secret_info;
    string info;
  }

  struct AccountOpinion {
    address owner_address;
    address account_address;
    string content;
    uint256 created_at;
    bool rate;
  }
}
