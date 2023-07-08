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
    PassingSecretInfoStructs.AccountOpinion[] private account_opinions;


    // amount in WEI
    function addSecretInfo (uint256 _amount, string memory _title, string memory _description, uint256 _max_uses, string memory _info) public {
        address[] memory accessed_adresses = new address[](0);
        PassingSecretInfoStructs.SecretInfo storage secret_info = secret_infos.push();

        Helpers.validateInt(_amount, 1e24);
        Helpers.validateStringLength(_title, 250);
        Helpers.validateStringLength(_description, 1000);
        Helpers.validateInt(_max_uses, 1e24);
        Helpers.validateStringLength(_info, 10000);
        secret_info.id = secret_info_id;
        secret_info.owner_address = msg.sender;
        secret_info.amount = _amount;
        secret_info.title = _title;
        secret_info.description = _description;
        secret_info.max_uses = _max_uses;
        secret_info.created_at = block.timestamp;
        secret_info.current_uses = 0;

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

    function getSecretInfosAccessed () public view returns (PassingSecretInfoStructs.SecretInfoAccessedResponse[] memory) {
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
        require(secret_infos[_secret_info_id].owner_address != msg.sender, "You are owner of this secret info");
        require(secret_infos[_secret_info_id].amount == msg.value, "Wrong ETH (WEI) value");

        if (secret_infos[_secret_info_id].max_uses <= secret_infos[_secret_info_id].current_uses) {
            revert("Supply has been used");
        }

        for (uint256 i = 0; i < secret_infos_accessed[_secret_info_id].accessed_adresses.length; i++) {
            if (secret_infos_accessed[_secret_info_id].accessed_adresses[i] == msg.sender) {
                revert("You already paid for this info");
            }
        }

        (bool sent,) = secret_infos[_secret_info_id].owner_address.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        secret_infos[_secret_info_id].current_uses += 1;
        secret_infos_accessed[_secret_info_id].accessed_adresses.push(msg.sender);
    }

    function addSecretInfoReply (uint256 _secret_infos_id, string memory _content) public {
        Helpers.validateStringLength(_content, 1000);
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

    function addAccountOpinion(address account_address, string memory _content, bool _rate) public {
        Helpers.validateStringLength(_content, 1000);
        account_opinions.push(
            PassingSecretInfoStructs.AccountOpinion(msg.sender, account_address, block.timestamp, _content, _rate)
        );
    }

    function getAccountOpinionsByAddress(address _account_address) public view returns (PassingSecretInfoStructs.AccountOpinion[] memory) {
        PassingSecretInfoStructs.AccountOpinion[] memory account_opinions_by_address = new PassingSecretInfoStructs.AccountOpinion[](account_opinions.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < account_opinions.length; i++) {
            if (account_opinions[i].account_address == _account_address) {
                account_opinions_by_address[counter] = (account_opinions[i]);
                counter++;
            }
        }

        assembly {
            mstore(account_opinions_by_address, counter)
        }

        return account_opinions_by_address;
    }
}