import React, { FC, useState } from 'react';
import { companiesSalariesContract } from 'smart-contracts/companies-salaries/actions';
import { useQuery } from 'react-query';
import { CompaniesSalaryList } from 'features/companies-salaries';
import { IsOwnerCheckbox, SearchInput, Sort } from 'features/components';
import CreateCompaniesSalaryForm from 'features/companies-salaries/create-companies-salary-form';
import { SMART_CONTRACTS_DATA_ENUM } from 'smart-contracts/types';

const CompaniesSalaries: FC = () => {
  const { data, error } = useQuery('companies-salaries', companiesSalariesContract.getSalaries);
  const [isCreateCompaniesSalaryModalOpen, setIsCreateCompaniesSalaryModalOpen] = useState(false);

  if (!data) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <>
      {isCreateCompaniesSalaryModalOpen && <CreateCompaniesSalaryForm setIsModalOpen={setIsCreateCompaniesSalaryModalOpen} />}

      <section className="flex flex-wrap items-center gap-2 lg:gap-4 xl:gap-8">
        <SearchInput type={SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY} />
        <Sort type={SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY}  />
        <button 
          onClick={() => setIsCreateCompaniesSalaryModalOpen(true)}
          className='button'
        >
          Create company salary
        </button>
      </section>

      <CompaniesSalaryList companiesSalaries={data} />
    </>
  );
};

export default CompaniesSalaries;
