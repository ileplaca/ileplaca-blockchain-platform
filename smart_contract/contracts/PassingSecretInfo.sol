// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./PassingSecretInfoStructs.sol";
import "./Helpers.sol";
// import "hardhat/console.sol";

contract PassingSecretInfo {
    uint256 secret_info_id = 0;
    uint256 secret_info_reply_id = 0;
    uint256 secret_info_rate_id = 0;

    PassingSecretInfoStructs.SecretInfo[] public secret_infos;
    PassingSecretInfoStructs.SecretInfoAccessed[] private secret_infos_accessed;

    // amount in WEI
    function addSecretInfo (uint256 _amount, string memory _title, string memory _description, string memory _company_name, uint256 _company_id, uint256 _max_uses, string memory _info) public {
        address[] memory accessed_adresses = new address[](0);
        PassingSecretInfoStructs.SecretInfo storage secret_info = secret_infos.push();
        secret_info.owner_address = msg.sender;
        secret_info.amount = _amount;
        secret_info.title = _title;
        secret_info.description = _description;
        secret_info.company_name = _company_name;
        secret_info.company_id = _company_id;
        secret_info.max_uses = _max_uses;
        secret_info.created_at = block.timestamp;

        secret_infos_accessed.push(
            PassingSecretInfoStructs.SecretInfoAccessed(
                _info,
                accessed_adresses
            )
        );

        secret_info_id++;
    }

    function getSecretInfos () public view returns (PassingSecretInfoStructs.SecretInfo[] memory) {
        return secret_infos;
    }

    function getSecretInfoById (uint256 id) public view returns (PassingSecretInfoStructs.SecretInfo memory) {
        return secret_infos[id];
    }

    function getSecretInfosByCompanyName (string memory _company_name) public view returns (PassingSecretInfoStructs.SecretInfo[] memory) {
        PassingSecretInfoStructs.SecretInfo[] memory secret_infos_by_company_name = new PassingSecretInfoStructs.SecretInfo[](secret_infos.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < secret_infos.length; i++) {
            if (Helpers.compareStrings(secret_infos[i].company_name, _company_name)) {
                secret_infos_by_company_name[counter] = secret_infos[i];
                counter++;
            }
        }

        assembly {
            mstore(secret_infos_by_company_name, counter)
        }

        return secret_infos_by_company_name;
    }

    function getSecretInfosByCompanyId (uint256 _company_id) public view returns (PassingSecretInfoStructs.SecretInfo[] memory) {
        PassingSecretInfoStructs.SecretInfo[] memory secret_infos_by_company_name = new PassingSecretInfoStructs.SecretInfo[](secret_infos.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < secret_infos.length; i++) {
            if (secret_infos[i].company_id == _company_id) {
                secret_infos_by_company_name[counter] = secret_infos[i];
                counter++;
            }
        }

        assembly {
            mstore(secret_infos_by_company_name, counter)
        }

        return secret_infos_by_company_name;
    }

    function getSecretInfoAccessedById (uint256 _secret_info_id) public view returns (PassingSecretInfoStructs.SecretInfoAccessedResponse memory) {
        if (getSecretInfoById(_secret_info_id).owner_address == msg.sender) {
            return PassingSecretInfoStructs.SecretInfoAccessedResponse(secret_infos[_secret_info_id], secret_infos_accessed[_secret_info_id]);
        }

        for (uint256 i = 0; i < secret_infos_accessed[_secret_info_id].accessed_adresses.length; i++) {
            if (secret_infos_accessed[_secret_info_id].accessed_adresses[i] == msg.sender) {
                return PassingSecretInfoStructs.SecretInfoAccessedResponse(secret_infos[_secret_info_id], secret_infos_accessed[_secret_info_id]);
            }
        }
        
        revert("You don't have access to this info. You have to pay owner of info.");
    }

    function getPaidSecretInfosAccessed () public view returns (PassingSecretInfoStructs.SecretInfoAccessedResponse[] memory) {
        PassingSecretInfoStructs.SecretInfoAccessedResponse[] memory paid_secret_infos_accessed = new PassingSecretInfoStructs.SecretInfoAccessedResponse[](secret_infos.length);
        uint256 counter = 0;
        
        for (uint256 i = 0; i < secret_infos_accessed.length; i++) {
            if ((getSecretInfoById(i)).owner_address == msg.sender) {
                paid_secret_infos_accessed[counter] = PassingSecretInfoStructs.SecretInfoAccessedResponse(secret_infos[i], secret_infos_accessed[i]);
                counter++;
            } else {
                for (uint256 j = 0; j < secret_infos_accessed[i].accessed_adresses.length; j++) {
                    if (secret_infos_accessed[i].accessed_adresses[j] == msg.sender) {
                        paid_secret_infos_accessed[counter] = PassingSecretInfoStructs.SecretInfoAccessedResponse(secret_infos[i], secret_infos_accessed[i]);
                        counter++;
                    }
                }
            }
        }
        
        assembly {
            mstore(paid_secret_infos_accessed, counter)
        }

        return paid_secret_infos_accessed;
    }

    function payForSecretInfoAccess (uint256 _secret_info_id) public payable {
        require(secret_infos[_secret_info_id].amount == msg.value, "Wrong ETH (WEI) value");

        if (secret_infos[_secret_info_id].max_uses <= secret_infos_accessed[_secret_info_id].accessed_adresses.length) {
            revert("Supply has been used");
        }

        for (uint256 i = 0; i < secret_infos_accessed[_secret_info_id].accessed_adresses.length; i++) {
            if (secret_infos_accessed[_secret_info_id].accessed_adresses[i] == msg.sender) {
                revert("You already paid for this info");
            }
        }

        (bool sent,) = secret_infos[_secret_info_id].owner_address.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        secret_infos_accessed[_secret_info_id].accessed_adresses.push(msg.sender);
    }

    function addSecretInfoReply (uint256 _secret_infos_id, string memory _content) public {
        secret_infos[_secret_infos_id].replies.push(Structs.Reply(secret_info_reply_id, msg.sender, block.timestamp, _content));
        secret_info_reply_id++;
    }

    function addSecretInfoRate (uint256 _secret_infos_id, bool _rate) public {
        for (uint256 i = 0; i < secret_infos[_secret_infos_id].rates.length; i++) {
            if (secret_infos[_secret_infos_id].rates[i].owner_address == msg.sender) {
                revert("You already rate this info");
            }
        }

        secret_infos[_secret_infos_id].rates.push(Structs.Rate(secret_info_reply_id, msg.sender, _rate));
        secret_info_rate_id++;
    }

    function removeSecretInfoRate (uint256 _secret_infos_id) public {
        for (uint256 i = 0; i < secret_infos[_secret_infos_id].rates.length; i++) {
            if (secret_infos[_secret_infos_id].rates[i].owner_address == msg.sender) {
                for (uint j = i; j < secret_infos[_secret_infos_id].rates.length-1; j++){
                    secret_infos[_secret_infos_id].rates[j] = secret_infos[_secret_infos_id].rates[j+1];
                }
                secret_infos[_secret_infos_id].rates.pop();
                return;
            }
        }

        revert("You don't have any rate");
    }

    function changeSecretInfoRate (uint256 _secret_infos_id) public {
        for (uint256 i = 0; i < secret_infos[_secret_infos_id].rates.length; i++) {
            if (secret_infos[_secret_infos_id].rates[i].owner_address == msg.sender) {
                if (secret_infos[_secret_infos_id].rates[i].rate == true) {
                    secret_infos[_secret_infos_id].rates[i].rate = false;
                    return;
                }
                else {
                    secret_infos[_secret_infos_id].rates[i].rate = true;
                    return;
                }
            }
        }

        revert("You don't have any rate");
    }
}