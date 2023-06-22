// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Structs.sol";

library PassingSecretInfoStructs {
  struct SecretInfo {
      uint256 id;
      address owner_address;
      // amount in WEI
      uint256 amount;
      string title;
      string description;
      string company_name;
      uint256 company_id;
      uint256 created_at;
      uint256 max_uses;
      Structs.Reply[] replies;
      Structs.Rate[] rates;
  }

  struct SecretInfoAccessed {
      string info;
      address[] accessed_adresses;
  }

  struct SecretInfoAccessedResponse {
      SecretInfo secret_info;
      SecretInfoAccessed secret_info_accessed;
  }
}