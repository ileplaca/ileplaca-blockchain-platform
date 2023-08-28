// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './CompaniesSalariesStructs.sol';
import './Helpers.sol';

// import "hardhat/console.sol";

contract CompaniesSalaries {
  uint256 salary_id = 0;
  uint256 salary_reply_id = 0;
  uint256 salary_rate_id = 0;

  CompaniesSalariesStructs.Salary[] salaries;

  function addSalary(
    uint256 _current,
    uint256 _first,
    uint256 _speed_of_growth,
    uint256 _raise_change,
    string memory _role,
    string memory _experience,
    string memory _opinion,
    uint256 _company_id,
    string memory _company_name
  ) public {
    CompaniesSalariesStructs.Salary storage salary = salaries.push();
    Helpers.validateInt(_current, 1e7);
    Helpers.validateInt(_first, 1e7);
    Helpers.validateInt(_speed_of_growth, 1e4);
    Helpers.validateInt(_raise_change, 1e6);
    Helpers.validateStringLength(_role, 100);
    Helpers.validateStringLength(_experience, 100);
    Helpers.validateStringLength(_opinion, 1000);
    Helpers.validateInt(_company_id, 1e18);
    Helpers.validateStringLength(_experience, 100);

    salary.salary_id = salary_id;
    salary.owner_address = msg.sender;
    salary.current = _current;
    salary.first = _first;
    salary.speed_of_growth = _speed_of_growth;
    salary.raise_change = _raise_change;
    salary.role = _role;
    salary.experience = _experience;
    salary.opinion = _opinion;
    salary.company_id = _company_id;
    salary.company_name = _company_name;
    salary.created_at = block.timestamp;

    salary_id++;
  }

  function getSalaries() public view returns (CompaniesSalariesStructs.Salary[] memory) {
    return salaries;
  }

  function getSalaryById(uint256 _salary_id) public view returns (CompaniesSalariesStructs.Salary memory) {
    return salaries[_salary_id];
  }

  function getSalariesByCompanyId(uint256 _company_id) public view returns (CompaniesSalariesStructs.Salary[] memory) {
    CompaniesSalariesStructs.Salary[] memory salaries_by_company_id = new CompaniesSalariesStructs.Salary[](
      salaries.length
    );
    uint256 counter = 0;

    for (uint256 i = 0; i < salaries.length; i++) {
      if (salaries[i].company_id == _company_id) {
        salaries_by_company_id[counter] = salaries[i];
        counter++;
      }
    }

    // Trim the array to remove any uninitialized elements
    assembly {
      mstore(salaries_by_company_id, counter)
    }

    return salaries_by_company_id;
  }

  function getSalariesByCompanyName(
    string memory _company_name
  ) public view returns (CompaniesSalariesStructs.Salary[] memory) {
    CompaniesSalariesStructs.Salary[] memory salaries_by_company_name = new CompaniesSalariesStructs.Salary[](
      salaries.length
    );
    uint256 counter = 0;

    for (uint256 i = 0; i < salaries.length; i++) {
      if (Helpers.compareStrings(salaries[i].company_name, _company_name)) {
        salaries_by_company_name[counter] = salaries[i];
        counter++;
      }
    }

    // Trim the array to remove any uninitialized elements
    assembly {
      mstore(salaries_by_company_name, counter)
    }

    return salaries_by_company_name;
  }

  function addSalaryReply(uint256 _salary_id, string memory _content) public {
    Helpers.validateStringLength(_content, 1000);
    salaries[_salary_id].replies.push(Structs.Reply(salary_reply_id, msg.sender, block.timestamp, _content));
    salary_reply_id++;
  }

  function addSalaryRate(uint256 _salary_id, bool _rate) public {
    for (uint256 i = 0; i < salaries[_salary_id].rates.length; i++) {
      if (salaries[_salary_id].rates[i].owner_address == msg.sender) {
        revert('You already rate this info');
      }
    }

    salaries[_salary_id].rates.push(Structs.Rate(salary_reply_id, msg.sender, _rate));
    salary_rate_id++;
  }

  function removeSalaryRate(uint256 _salary_id) public {
    for (uint256 i = 0; i < salaries[_salary_id].rates.length; i++) {
      if (salaries[_salary_id].rates[i].owner_address == msg.sender) {
        for (uint j = i; j < salaries[_salary_id].rates.length - 1; j++) {
          salaries[_salary_id].rates[j] = salaries[_salary_id].rates[j + 1];
        }
        salaries[_salary_id].rates.pop();
        return;
      }
    }

    revert("You don't have any rate");
  }

  function changeSalaryRate(uint256 _salary_id) public {
    for (uint256 i = 0; i < salaries[_salary_id].rates.length; i++) {
      if (salaries[_salary_id].rates[i].owner_address == msg.sender) {
        if (salaries[_salary_id].rates[i].rate == true) {
          salaries[_salary_id].rates[i].rate = false;
          return;
        } else {
          salaries[_salary_id].rates[i].rate = true;
          return;
        }
      }
    }

    revert("You don't have any rate");
  }
}
