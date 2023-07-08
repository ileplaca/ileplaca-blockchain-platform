import React, { FC } from 'react';
import { Salary } from 'smart-contracts/companies-salaries/types';
import { parseDateFns } from 'utils/constans/date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import useCompaniesSalaryItem from './use-companies-salary-item';

export interface CompaniesSalaryItemProps {
  salary: Salary;
}

const CompaniesSalaryItem: FC<CompaniesSalaryItemProps> = ({ salary }) => {
  const { positiveRates, negativeRates, currentRate, like, unlike } = useCompaniesSalaryItem({
    salary,
  });
  const [
    salary_id,
    owner_address,
    current,
    first,
    speed_of_growth,
    raise_change,
    role,
    experience,
    opinion,
    company_id,
    company_name,
    created_at,
    replies,
    rates,
  ] = salary;

  return (
    <div key={salary_id} className="w-full p-6 mt-10 border border-gray-600 rounded text-text">
      <div className="flex flex-row">
        <div className="w-full text-sm font-light dont-break-out">{owner_address}</div>
        <div className="flex flex-row items-center justify-end w-full gap-4">
          <button className="duration-75 cursor-pointer text-text hover:text-primary-text">
            Reply {`(${replies.length})`}
          </button>
          <button
            className={`hover:text-green-400 duration-75${
              currentRate?.[2] ? 'text-green-500' : ''
            }`}
            onClick={like}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> {positiveRates}
          </button>
          <button
            className={`hover:text-red-400 duration-75 ${
              currentRate?.[2] === false ? 'text-red-500' : ''
            }`}
            onClick={unlike}
          >
            <FontAwesomeIcon icon={faThumbsDown} /> {negativeRates}
          </button>
        </div>
      </div>

      <div className="text-xl font-medium">{role}</div>
      <div className="-mt-1 font-light">{experience}</div>
      <div className="mt-2 text-sm text-opacity-60 text-secondary">{company_name}</div>
      <div>{opinion}</div>
      <div className="font-light">{parseDateFns(new Date(Number(created_at) * 1000))}</div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <div className="px-2 py-1 border border-gray-500 rounded-button">
          <span className="font-light">Current </span> {Number(current)}zł
        </div>
        <div className="px-2 py-1 border border-gray-500 rounded-button">
          <span className="font-light">First </span>
          {Number(first)}zł
        </div>
        <div className="px-2 py-1 border border-gray-500 rounded-button">
          <span className="font-light">Speed of growth </span>
          {Number(speed_of_growth)}%
        </div>
        <div className="px-2 py-1 border border-gray-500 rounded-button">
          <span className="font-light">Raise change </span>
          {Number(raise_change)}zł
        </div>
      </div>
    </div>
  );
};

export default CompaniesSalaryItem;
