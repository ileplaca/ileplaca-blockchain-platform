import CompaniesSalariesList from 'features/companies-salaries/companies-salary-list/companies-salary-list';
import Sidebar from 'features/ui/sidebar/sidebar';
import React, { FC, useEffect, useState } from 'react';
import { companiesSalariesContract } from 'smart-contracts/companies-salaries/actions';
import { Salary } from 'smart-contracts/companies-salaries/types';
import { useQuery } from 'react-query'

const CompaniesSalaries: FC = () => {
  const { data, error } = useQuery('companies-salaries', companiesSalariesContract.getSalaries);

  {/* <button onClick={() => {
      companiesSalariesContract.addSalary(8000, 4000, 50, 2000, "Java Spring developer", "1 year", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis adipisci, quasi ut deserunt similique enim, magni facere natus, error voluptate a quisquam consectetur qui quidem exercitationem non est? Dolor, perspiciatis?", 0, "Samsung");
    }}>dodaj</button> */}

  return (
    <>
      { data ? <CompaniesSalariesList companiesSalaries={data} /> : "Loading..." }
    </>
  )
}

export default CompaniesSalaries;