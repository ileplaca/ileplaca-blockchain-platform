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
    uint256 _first,
    uint256 _last,
    uint256 _speed_of_growth,
    uint256 _company_id,
    string memory _company_name,
    string memory _role,
    string memory _experience,
    string memory _opinion,
    string memory _location,
    string memory _employment_type,
    string memory _operating_mode
  ) public {
    CompaniesSalariesStructs.Salary storage salary = salaries.push();
    Helpers.validateInt(_first, 1e9);
    Helpers.validateInt(_last, 1e9);
    Helpers.validateInt(_speed_of_growth, 1e9);
    Helpers.validateInt(_company_id, 1e18);
    Helpers.validateStringLength(_company_name, 300);
    Helpers.validateStringLength(_role, 100);
    Helpers.validateStringLength(_experience, 50);
    Helpers.validateStringLength(_opinion, 1000);
    Helpers.validateStringLength(_location, 50);
    Helpers.validateStringLength(_employment_type, 50);
    Helpers.validateStringLength(_operating_mode, 50);

    salary.salary_id = salary_id;
    salary.owner_address = msg.sender;
    salary.first = _first;
    salary.last = _last;
    salary.speed_of_growth = _speed_of_growth;
    salary.company_id = _company_id;
    salary.company_name = _company_name;
    salary.role = _role;
    salary.experience = _experience;
    salary.opinion = _opinion;
    salary.location = _location;
    salary.employment_type = _employment_type;
    salary.operating_mode = _operating_mode;
    salary.created_at = block.timestamp;

    salary_id++;
  }

  function getSalaries() public view returns (CompaniesSalariesStructs.Salary[] memory) {
    return salaries;
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
