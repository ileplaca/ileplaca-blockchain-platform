import React, { FC } from 'react';
import { companiesSalariesContract } from 'smart-contracts/companies-salaries/actions';
import { useQuery } from 'react-query';
import CompaniesSalariesList from 'features/companies-salaries/companies-salary-list';

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
      {/* <button onClick={() => {
        companiesSalariesContract.addSalary(40000, 20000, 50, 10000, "Python machine learning", "8 years", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis adipisci, quasi ut deserunt similique enim, magni facere natus, error voluptate a quisquam consectetur qui quidem exercitationem non est? Dolor, perspiciatis?", 2, "Google");
      }}>dodaj</button> */}
      <section className="flex items-center gap-8">
        <input
          type="text"
          className="px-4 py-3 text-white border border-gray-600 outline-none placeholder:text-gray-300 bg-bg rounded-button"
          placeholder="Search salary"
        />
        <select
          className="px-4 py-3 text-white border border-gray-600 outline-none placeholder:text-gray-300 bg-bg rounded-button"
          name=""
          id=""
        >
          <option value="">Newest</option>
        </select>
        <button className="px-4 py-3 font-medium duration-100 rounded-button bg-primary hover:bg-primary-hover">
          Add company salary
        </button>
      </section>

      <CompaniesSalariesList companiesSalaries={data} />
    </>
  );
};

export default CompaniesSalaries;
