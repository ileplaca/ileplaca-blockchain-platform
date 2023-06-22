import React, { FC } from 'react';
import { Salary } from 'smart-contracts/companies-salaries/types';
import { parseDateFns } from 'utils/constans/date-fns';

export interface CompaniesSalaryItemProps {
  salary: Salary
}

const CompaniesSalaryItem: FC<CompaniesSalaryItemProps> = ({
  salary: [salary_id, owner_address, current, first, speed_of_growth, raise_change, role, experience, opinion, company_id, company_name, created_at] 
}) => {
  return (
    <div key={salary_id} className='w-full p-6 mt-10 border border-gray-600 rounded text-text'>
      <div className='text-sm font-light dont-break-out'>
        {owner_address}
      </div>
      <div className='mt-2 text-xl font-medium'>
        {role}
      </div>
      <div className='-mt-1 font-light'>
        {experience}
      </div>
      <div className='mt-2 text-sm text-opacity-60 text-secondary'>
        {company_name}
      </div>
      <div>
        {opinion}
      </div>
      <div className='font-light'>
        {parseDateFns(new Date(Number(created_at) * 1000))}
      </div>
      <div className='flex flex-wrap items-center gap-4 mt-4'>
        <div className='px-2 py-1 border border-gray-500 rounded-button'>
          <span className='font-light'>Current </span> {Number(current)}zł
        </div>
        <div className='px-2 py-1 border border-gray-500 rounded-button'>
          <span className='font-light'>First </span>
            {Number(first)}zł
        </div>
        <div className='px-2 py-1 border border-gray-500 rounded-button'>
          <span className='font-light'>Speed of growth </span>
            {Number(speed_of_growth)}%
        </div>
        <div className='px-2 py-1 border border-gray-500 rounded-button'>
          <span className='font-light'>Raise change </span>
          {Number(raise_change)}zł
        </div>
      </div>
    </div>
  )
}

export default CompaniesSalaryItem;