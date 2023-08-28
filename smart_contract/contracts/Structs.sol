// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

library Structs {
  struct Reply {
    uint256 id;
    address owner_address;
    uint256 created_at;
    string content;
  }

  struct Rate {
    uint256 id;
    address owner_address;
    // false is -1, true is 1
    bool rate;
  }
}
