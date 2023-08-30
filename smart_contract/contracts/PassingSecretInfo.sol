// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './PassingSecretInfoStructs.sol';
import './Helpers.sol';
import './Structs.sol';
// import "hardhat/console.sol";

contract PassingSecretInfo {
  address public immutable owner;
  uint8 private constant tax_percent = 5;

  uint256 private secret_info_id = 0;
  uint256 private secret_info_reply_id = 0;
  uint256 private secret_info_rate_id = 0;
  uint256 private secret_info_opinion_id = 0;

  PassingSecretInfoStructs.SecretInfo[] private secret_infos;

  mapping(uint256 => string) private secret_infos_accessed;
  mapping(uint256 => PassingSecretInfoStructs.AccountOpinion) private account_opinions;
  // address => secret infos accessed ids
  mapping(address => uint256[]) private accessed_ids;

  constructor() {
    owner = msg.sender;
  }

  function getSecretInfoId() public view returns (uint256) {
    return secret_info_id;
  }

  function addSecretInfo(
    uint256 _amount,
    string memory _title,
    string memory _description,
    uint256 _max_uses,
    string memory _info,
    string memory _zero_knowledge_proof
  ) public {
    PassingSecretInfoStructs.SecretInfo storage secret_info = secret_infos.push();

    Helpers.validateInt(_amount, 1e24);
    Helpers.validateStringLength(_title, 250);
    Helpers.validateStringLength(_description, 1000);
    Helpers.validateInt(_max_uses, 1e24);
    Helpers.validateStringLength(_zero_knowledge_proof, 1000);
    Helpers.validateStringLength(_info, 10000);

    secret_info.id = secret_info_id;
    secret_info.owner_address = msg.sender;
    secret_info.amount = _amount;
    secret_info.title = _title;
    secret_info.description = _description;
    secret_info.zero_knowledge_proof = _zero_knowledge_proof;
    secret_info.max_uses = _max_uses;
    secret_info.current_uses = 0;
    secret_info.created_at = block.timestamp;

    accessed_ids[msg.sender].push(secret_info_id);

    secret_info_id++;
  }

  function getSecretInfos() public view returns (PassingSecretInfoStructs.SecretInfo[] memory) {
    return secret_infos;
  }

  function getSecretInfoAccessedById(uint256 _secret_info_id) public view returns (PassingSecretInfoStructs.SecretInfoAccessedResponse memory) {
    for (uint256 i = 0; i < accessed_ids[msg.sender].length; i++) {
      if (accessed_ids[msg.sender][i] == _secret_info_id) {
        return PassingSecretInfoStructs.SecretInfoAccessedResponse(
          secret_infos[_secret_info_id],
          secret_infos_accessed[_secret_info_id]
        );
      }
    }

    revert("You don't have access to this secret info");
  }

  function payForSecretInfoAccess(uint256 _secret_info_id) public payable {
    require(secret_infos[_secret_info_id].owner_address != msg.sender, 'You are owner of this secret info, you cannot pay for yours secret infos');
    require(secret_infos[_secret_info_id].amount == msg.value, 'Wrong amount value');
    require(
      secret_infos[_secret_info_id].max_uses > secret_infos[_secret_info_id].current_uses,
      'Supply has been used'
    );

    for (uint256 id = 0; id < accessed_ids[msg.sender].length; id++) {
      // id = secret_info_id
      require(
        id != _secret_info_id,
        'You already paid for this secret info'
      );
    }

    uint256 tax_amount = (msg.value * tax_percent) / 100;
    uint256 taxed_amount = msg.value - tax_amount;

    (bool sentTax, ) = owner.call{value: tax_amount}('');
    require(sentTax, 'Transfer to owner failed');

    (bool sent, ) = secret_infos[_secret_info_id].owner_address.call{value: taxed_amount}('');
    require(sent, 'Failed to send Ether');

    secret_infos[_secret_info_id].current_uses += 1;
    accessed_ids[msg.sender].push(_secret_info_id);
  }

  function addSecretInfoReply(uint256 _secret_info_id, string memory _content) public {
    Helpers.validateStringLength(_content, 1000);
    secret_infos[_secret_info_id].replies.push(
      Structs.Reply(secret_info_reply_id, msg.sender, block.timestamp, _content)
    );
    secret_info_reply_id++;
  }

  function addSecretInfoRate(uint256 _secret_info_id, bool _rate) public {
    require(secret_infos[_secret_info_id].owner_address != msg.sender, 'You are owner of this secret info');

    for (uint256 i = 0; i < secret_infos[_secret_info_id].rates.length; i++) {
      if (secret_infos[_secret_info_id].rates[i].owner_address == msg.sender) {
        revert('You already rate this info');
      }
    }

    secret_infos[_secret_info_id].rates.push(Structs.Rate(secret_info_reply_id, msg.sender, _rate));
    secret_info_rate_id++;
  }

  function removeSecretInfoRate(uint256 _secret_info_id) public {
    for (uint256 i = 0; i < secret_infos[_secret_info_id].rates.length; i++) {
      if (secret_infos[_secret_info_id].rates[i].owner_address == msg.sender) {
        for (uint j = i; j < secret_infos[_secret_info_id].rates.length - 1; j++) {
          secret_infos[_secret_info_id].rates[j] = secret_infos[_secret_info_id].rates[j + 1];
        }
        secret_infos[_secret_info_id].rates.pop();
        return;
      }
    }

    revert("You don't have any rate");
  }

  function changeSecretInfoRate(uint256 _secret_info_id) public {
    for (uint256 i = 0; i < secret_infos[_secret_info_id].rates.length; i++) {
      if (secret_infos[_secret_info_id].rates[i].owner_address == msg.sender) {
        if (secret_infos[_secret_info_id].rates[i].rate == true) {
          secret_infos[_secret_info_id].rates[i].rate = false;
          return;
        } else {
          secret_infos[_secret_info_id].rates[i].rate = true;
          return;
        }
      }
    }

    revert("You don't have any rate");
  }

  function addAccountOpinion(address account_address, string memory _content, bool _rate) public {
    require(account_address != msg.sender, 'You cannot add opinion to your account');
    Helpers.validateStringLength(_content, 1000);
    account_opinions[secret_info_opinion_id] = PassingSecretInfoStructs.AccountOpinion(msg.sender, account_address, block.timestamp, _content, _rate);
    secret_info_opinion_id++;
  }

  function getAccountOpinionsByAddress(
    address _account_address
  ) public view returns (PassingSecretInfoStructs.AccountOpinion[] memory) {
    PassingSecretInfoStructs.AccountOpinion[]
      memory account_opinions_by_address = new PassingSecretInfoStructs.AccountOpinion[](secret_info_opinion_id);
    uint256 counter = 0;

    for (uint256 i = 0; i < secret_info_opinion_id; i++) {
      if (account_opinions[i].account_address == _account_address) {
        account_opinions_by_address[counter] = account_opinions[i];
        counter++;
      }
    }

    assembly {
      mstore(account_opinions_by_address, counter)
    }

    return account_opinions_by_address;
  }
}
