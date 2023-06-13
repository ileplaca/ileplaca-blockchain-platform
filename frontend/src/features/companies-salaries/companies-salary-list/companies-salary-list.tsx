import React, { FC } from 'react';
import { Salary } from 'smart-contracts/companies-salaries/types';
import CompaniesSalaryItem from '../companies-salary-item';

interface CompaniesSalariesListProps {
  companiesSalaries: Salary[]
}

const CompaniesSalariesList: FC<CompaniesSalariesListProps> = ({ companiesSalaries }) => {
  return (
    <>
      {companiesSalaries.map(salary => (
        <CompaniesSalaryItem salary={salary} />
      ))}
    </>
  )
}

export default CompaniesSalariesList;