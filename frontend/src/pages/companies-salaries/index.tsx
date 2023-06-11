import Sidebar from 'features/ui/sidebar/sidebar';
import React, { FC, useEffect, useState } from 'react';
import { companiesSalariesContract } from 'smart-contracts/companies-salaries/actions';
import { Salary } from 'smart-contracts/companies-salaries/types';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';

const CompaniesSalaries: FC = () => {
  const [companiesSalaries, setCompaniesSalaries] = useState<Salary[]>([]);

  useEffect(() => {
    const fetchCompaniesSalaries = async () => {
      const data = await companiesSalariesContract.getSalaries();
      setCompaniesSalaries(data)
      console.log(data)
    }
    fetchCompaniesSalaries()
  }, [])

  return (
    <main className='flex flex-row'>
      <Sidebar />
      <section>
        {/* <button onClick={() => {
          companiesSalariesContract.addSalary(3000, 2000, 50, 500, "Frontenddev", "2 years", "OK", 2);
        }}>dodaj</button> */}
        Companies salaries
        {companiesSalaries.map(([salary_id, owner_address, current, first, speed_of_growth, raise_change, role, experience, opinion, company_id]) => (
          <div className=' text-text'>
            <div className='text-sm font-light'>
              {owner_address}
            </div>
            <div>
              {Number(current)}
            </div>
            <div>
              {Number(first)}
            </div>
            <div>
              {Number(speed_of_growth)}
            </div>
            <div>
              {Number(raise_change)}
            </div>
            <div>
              {role}
            </div>
            <div>
              {experience}
            </div>
            <div>
              {opinion}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default CompaniesSalaries;