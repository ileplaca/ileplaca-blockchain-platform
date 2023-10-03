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
    CompaniesSalariesStructs.SalaryDto memory companiesSalaries
  ) public {
    CompaniesSalariesStructs.Salary storage salary = salaries.push();
    Helpers.validateInt(companiesSalaries.first, 1e12);
    Helpers.validateInt(companiesSalaries.last, 1e12);
    Helpers.validateInt(companiesSalaries.speed_of_growth, 1e9);
    Helpers.validateStringLength(companiesSalaries.company_name, 100);
    Helpers.validateStringLength(companiesSalaries.role, 100);
    Helpers.validateStringLength(companiesSalaries.opinion, 1000);
    Helpers.validateStringLength(companiesSalaries.location, 50);
    Helpers.validateStringLength(companiesSalaries.employment_type, 50);
    Helpers.validateStringLength(companiesSalaries.operating_mode, 50);
    Helpers.validateStringLength(companiesSalaries.salary_currency, 4);

    salary.salary_id = salary_id;
    salary.owner_address = msg.sender;
    salary.first = companiesSalaries.first;
    salary.last = companiesSalaries.last;
    salary.speed_of_growth = companiesSalaries.speed_of_growth;
    salary.company_id = companiesSalaries.company_id;
    salary.company_name = companiesSalaries.company_name;
    salary.role = companiesSalaries.role;
    salary.experience = companiesSalaries.experience;
    salary.opinion = companiesSalaries.opinion;
    salary.location = companiesSalaries.location;
    salary.employment_type = companiesSalaries.employment_type;
    salary.operating_mode = companiesSalaries.operating_mode;
    salary.salary_currency = companiesSalaries.salary_currency;
    salary.experience_in_company = companiesSalaries.experience_in_company;
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
