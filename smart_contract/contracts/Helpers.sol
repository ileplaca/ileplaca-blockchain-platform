// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

library Helpers {
  function compareStrings(string storage a, string memory b) internal pure returns (bool) {
      return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
  }

  function validateStringLength(string memory str, uint256 maxLength) internal pure {
      require(bytes(str).length <= maxLength, "String length exceeds the maximum allowed");
  }

  function validateInt(uint256 num, uint256 maxNum) internal pure {
      require(num <= maxNum, "Number exceeds the maximum allowed");
  }
}