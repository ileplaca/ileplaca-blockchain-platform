import React, { FC, useState } from 'react';
import { CompaniesSalaryList } from 'features/companies-salaries';
import { SearchInput, Sort } from 'features/components';
import CreateCompaniesSalaryForm from 'features/companies-salaries/create-companies-salary-form';
import { SMART_CONTRACTS_DATA_ENUM } from 'smart-contracts/types';
import { useSelector } from 'react-redux';
import { getManipulatedCompaniesSalaries } from 'smart-contracts/companies-salaries/slice';

const CompaniesSalaries: FC = () => {
  const [isCreateCompaniesSalaryModalOpen, setIsCreateCompaniesSalaryModalOpen] = useState(false);
  const companiesSalaries = useSelector(getManipulatedCompaniesSalaries);

  return (
    <>
      {isCreateCompaniesSalaryModalOpen && (
        <CreateCompaniesSalaryForm setIsModalOpen={setIsCreateCompaniesSalaryModalOpen} />
      )}

      <section className="flex flex-wrap items-center gap-2 lg:gap-4 xl:gap-8">
        <SearchInput type={SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY} />
        <Sort type={SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY} />
        <button onClick={() => setIsCreateCompaniesSalaryModalOpen(true)} className="button">
          Create company salary
        </button>
      </section>

      <CompaniesSalaryList companiesSalaries={companiesSalaries} />
    </>
  );
};

export default CompaniesSalaries;
