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
        string company_name;
    }

    struct SecretInfoAccessed {
        SecretInfo secret_info;
        string info;
        address[] accessed_adresses;
    }

    SecretInfo[] public secret_infos;
    SecretInfoAccessed[] private secret_infos_accessed;

    // amount in WEI
    function addSecretInfo (uint256 amount, string memory title, string memory description, string memory company_name, string memory info) public {
        address[] memory accessed_adresses = new address[](0);
        secret_infos.push(SecretInfo(secret_info_id, msg.sender, amount, title, description, company_name));
        secret_infos_accessed.push(
            SecretInfoAccessed(
                SecretInfo(secret_info_id, msg.sender, amount, title, description, company_name),
                info,
                accessed_adresses
            )
        );

        secret_info_id++;
    }

    function compareStrings(string storage a, string memory b) private pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function getSecretInfos () public view returns (SecretInfo[] memory) {
        return secret_infos;
    }

    function getSecretInfoById (uint256 id) public view returns (SecretInfo memory) {
        return secret_infos[id];
    }

    function getSecretInfosByCompanyName (string memory company_name) public view returns (SecretInfo[] memory) {
        SecretInfo[] memory secret_infos_by_company_name = new SecretInfo[](secret_infos.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < secret_infos.length; i++) {
            if (compareStrings(secret_infos[i].company_name, company_name)) {
                secret_infos_by_company_name[counter] = secret_infos[i];
                counter++;
            }
        }

        assembly {
            mstore(secret_infos_by_company_name, counter)
        }

        return secret_infos_by_company_name;
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