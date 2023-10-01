import React, { FC } from 'react';
import { companiesSalariesContract } from 'smart-contracts/companies-salaries/actions';
import { useQuery } from 'react-query';
import { CompaniesSalaryList } from 'features/companies-salaries';
import { SearchInput, Sort } from 'features/components';

const CompaniesSalaries: FC = () => {
  const { data, error } = useQuery('companies-salaries', companiesSalariesContract.getSalaries);

  if (!data) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      <section className="flex items-center gap-8">
        <SearchInput type='SecretInfo' />
        <Sort type='SecretInfo'  />
        <button onClick={() => {
          companiesSalariesContract.addSalary(5000, 10000, 50, 0, "Samsung filia Warszawa", "Junior backend developer Golang", "1 year Junior", "Generalnie wszystko spoko ok nawet polecam serdecznie, ale nie ma juz etatow.", "Warszawa", "B2B", "Zdalnie")
        }} className="px-4 py-3 font-medium duration-100 rounded-button bg-primary hover:bg-primary-hover">
          Add company salary
        </button>
      </section>

      <CompaniesSalaryList companiesSalaries={data} />
    </>
  );
};

export default CompaniesSalaries;
