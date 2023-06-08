// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

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
        SecretInfo secret_info;
        string info;
        address[] accessed_adresses;
    }

    SecretInfo[] public secret_infos;
    SecretInfoAccessed[] private secret_infos_accessed;


    function getSecretInfos () public view returns (SecretInfo[] memory) {
        return secret_infos;
    }

    function getSecretInfoById (uint256 id) public view returns (SecretInfo memory) {
        return secret_infos[id];
    }

    function getSecretInfoAccessed (uint256 id) public view returns (SecretInfoAccessed memory) {
        if (secret_infos_accessed[id].secret_info.owner_address == msg.sender) {
            return secret_infos_accessed[id];
        }

        for (uint256 i = 0; i < secret_infos_accessed[id].accessed_adresses.length; i++) {
            if (secret_infos_accessed[id].accessed_adresses[i] == msg.sender) {
                return secret_infos_accessed[id];
            }
        }
        revert("You don't have access to this info. You have to pay owner of info.");
    }

    // amount in WEI
    function addSecretInfo (uint256 amount, string memory title, string memory description, string memory info) public {
        address[] memory accessed_adresses = new address[](0);
        secret_infos.push(SecretInfo(secret_info_id, msg.sender, amount, title, description));
        secret_infos_accessed.push(
            SecretInfoAccessed(
                SecretInfo(secret_info_id, msg.sender, amount, title, description),
                info,
                accessed_adresses
            )
        );

        secret_info_id++;
    }

    function payForSecretInfoAccess (uint256 id) public payable {
        require(secret_infos[id].amount == msg.value, "Wrong ETH (WEI) value");

        for (uint256 i = 0; i < secret_infos_accessed[id].accessed_adresses.length; i++) {
            if (secret_infos_accessed[id].accessed_adresses[i] == msg.sender) {
                revert("You already paid for this info");
            }
        }

        (bool sent,) = secret_infos[id].owner_address.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        secret_infos_accessed[id].accessed_adresses.push(msg.sender);
    }
}