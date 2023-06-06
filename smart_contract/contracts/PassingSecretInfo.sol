// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract PassingSecretInfo {
    uint256 secret_info_id = 0;

    struct SecretInfo {
        uint256 secret_info_id;
        address owner_address;
        // amount in WEI
        uint256 amount;
        string title;
        string description;
    }

    struct SecretInfoAccessed {
        SecretInfo secretInfo;
        string info;
        address[] accessedAdresses;
    }

    SecretInfo[] public secretInfos;
    SecretInfoAccessed[] private secretInfosAccessed;

    function getSecretInfos () public view returns (SecretInfo[] memory) {
        return secretInfos;
    }

    function getSecretInfoAccessed (uint256 id) public view returns (SecretInfoAccessed memory) {
        if (secretInfosAccessed[id].secretInfo.owner_address == msg.sender) {
            return secretInfosAccessed[id];
        }

        for (uint256 i = 0; i < secretInfosAccessed[id].accessedAdresses.length; i++) {
            if (secretInfosAccessed[id].accessedAdresses[i] == msg.sender) {
                return secretInfosAccessed[id];
            }
        }
        revert("You don't have access to this info. You have to pay owner of info.");
    }

    // amount in WEI
    function addSecretInfo (uint256 amount, string memory title, string memory description, string memory info) public {
        address[] memory accessedAdresses = new address[](0);
        secretInfos.push(SecretInfo(secret_info_id, msg.sender, amount, title, description));
        secretInfosAccessed.push(
            SecretInfoAccessed(
                SecretInfo(secret_info_id, msg.sender, amount, title, description),
                info,
                accessedAdresses
            )
        );

        secret_info_id++;
    }

    function payForSecretInfoAccess (uint256 id) public payable {
        require(secretInfos[id].amount == msg.value, "Wrong ETH (WEI) value");
        (bool sent,) = secretInfos[id].owner_address.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        secretInfosAccessed[id].accessedAdresses.push(msg.sender);
    }
}