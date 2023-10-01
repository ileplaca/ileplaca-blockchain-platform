import React, { FC } from 'react';
import { Salary } from 'smart-contracts/companies-salaries/types';
import { parseDateFns } from 'utils/constans/date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import useCompaniesSalaryItem from './use-companies-salary-item';
import InfoBox from './info-box';
import { motion } from 'framer-motion';

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
    first,
    last,
    speed_of_growth,
    company_id,
    company_name,
    role,
    experience,
    opinion,
    location,
    employment_type,
    operating_mode,
    created_at,
    replies,
    rates
  ] = salary;

  return (
    <div key={salary_id} className="w-full p-6 mt-10 border border-gray-600 rounded text-text">
      <div className="flex flex-row">
        <div className="w-full text-sm font-light dont-break-out">{owner_address}</div>
        <div className="flex flex-row items-center justify-end w-full gap-4">
          <motion.button
            whileHover={{
              rotate: [0, 20, 0],
              transition: {
                duration: 0.125,
              },
            }}
            onClick={like}
            className={`hover:text-green-400 duration-75 ${
              currentRate?.[2] ? 'text-green-500' : ''
            }`}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> {positiveRates}
          </motion.button>
          <motion.button
            whileHover={{
              rotate: [0, 20, 0],
              transition: {
                duration: 0.125,
              },
            }}
            onClick={unlike}
            className={`hover:text-red-400 duration-75 ${
              currentRate?.[2] === false ? 'text-red-500' : ''
            }`}
          >
            <FontAwesomeIcon icon={faThumbsDown} /> {negativeRates}
          </motion.button>
        </div>
      </div>

      <div className="text-xl font-medium">{role}</div>
      <div className="-mt-1 font-light">{experience}</div>
      <div className="mt-2 text-sm text-opacity-60 text-secondary">{company_name}</div>
      <div>{opinion}</div>
      <div className="font-light">{parseDateFns(Number(created_at))}</div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <InfoBox name='Last salary' value={`${Number(last)}zł`} />
        <InfoBox name='First salary' value={`${Number(first)}zł`} />
        <InfoBox name='Speed of growth' value={Number(speed_of_growth)} />
        <InfoBox name='Location' value={location} />
        <InfoBox name='Employment type' value={employment_type} />
        <InfoBox name='Operating mode' value={operating_mode} />
      </div>
    </div>
  );
};

export default CompaniesSalaryItem;
