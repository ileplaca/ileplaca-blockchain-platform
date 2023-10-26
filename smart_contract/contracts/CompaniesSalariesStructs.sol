// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import './Structs.sol';

library CompaniesSalariesStructs {
  struct Salary {
    uint256 salary_id;
    address owner_address;
    uint256 first;
    uint256 last;
    uint256 speed_of_growth;
    uint256 company_id;
    string company_name;
    string role;
    uint16 experience;
    string opinion;
    string location;
    string employment_type;
    string operating_mode;
    string salary_currency;
    uint16 experience_in_company;
    uint256 created_at;
    Structs.Reply[] replies;
    Structs.Rate[] rates;
  }

  struct SalaryDto {
    uint256 first;
    uint256 last;
    uint256 speed_of_growth;
    uint256 company_id;
    string company_name;
    string role;
    uint16 experience;
    string opinion;
    string location;
    string employment_type;
    string operating_mode;
    string salary_currency;
    uint16 experience_in_company;
  }
}
