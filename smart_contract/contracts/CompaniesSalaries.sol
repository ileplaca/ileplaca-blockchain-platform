// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract CompaniesSalaries {
    uint256 salary_id = 0;

    struct Salary {
        uint256 salary_id;
        address owner_address;
        uint256 current;
        uint256 first;
        uint256 speed_of_growth;
        uint256 raise_change;
        string opinion;
        uint256 company_id;
    }

    Salary[] salaries;


    function addSalary (
        uint256 current,
        uint256 first,
        uint256 speed_of_growth,
        uint256 raise_change,
        string memory opinion,
        uint256 company_id
    ) public {
        salaries.push(Salary(salary_id, msg.sender, current, first, speed_of_growth, raise_change, opinion, company_id));
        salary_id++;
    }

    function getSalaries () public view  returns (Salary[] memory) {
        return salaries;
    }

    function getSalariesByCompanyId(uint256 company_id) public view returns (Salary[] memory) {
        Salary[] memory salaries_by_company_id = new Salary[](salaries.length);
        uint256 counter = 0;
        
        for (uint256 i = 0; i < salaries.length; i++) {
            if (salaries[i].company_id == company_id) {
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
}