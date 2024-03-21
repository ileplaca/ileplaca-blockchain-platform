import React, { FC } from 'react';
import { Salary } from 'smart-contracts/companies-salaries/types';
import CompaniesSalaryItem from '../companies-salary-item';
import { useSelector } from 'react-redux';
import { getCompaniesSalariesStatus } from 'smart-contracts/companies-salaries/slice';
import { ErrorMessage, Loading } from 'features/components';
import { ResponseStatus } from 'utils/types/api';

interface CompaniesSalariesListProps {
  companiesSalaries: Salary[];
}

const CompaniesSalariesList: FC<CompaniesSalariesListProps> = ({ companiesSalaries }) => {
  const status = useSelector(getCompaniesSalariesStatus);

  if (status === ResponseStatus.FAILED) return <ErrorMessage />;
  if (status === ResponseStatus.PENDING) return <Loading />;
  if (companiesSalaries.length === 0) {
    return <div className="mt-4">There is no companies salaries here</div>;
  }

  return (
    <>
      {companiesSalaries.map((salary) => (
        <CompaniesSalaryItem key={Number(salary[0])} salary={salary} />
      ))}
    </>
  );
};

export default CompaniesSalariesList;
