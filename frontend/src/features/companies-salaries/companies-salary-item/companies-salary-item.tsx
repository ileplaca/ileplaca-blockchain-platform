import React, { FC } from 'react';
import { Salary } from 'smart-contracts/companies-salaries/types';
import { parseDateFns } from 'utils/constans/date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import useCompaniesSalaryItem from './use-companies-salary-item';
import InfoBox from './info-box';
import { motion } from 'framer-motion';
import { handleCopyAddress } from 'utils/helpers/alert';
import { Link } from 'react-router-dom';
import { ROTUES } from 'utils/types/routes';

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
    salary_currency,
    experience_in_company,
    created_at,
    replies,
    rates,
  ] = salary;

  return (
    <motion.div
      whileInView={{
        opacity: [0, 100],
      }}
      key={Number(salary_id)}
      className="flex flex-col items-start w-full gap-2 p-3 mt-4 border border-gray-600 rounded xl:p-6 lg:mg-6 xl:mt-10 text-text"
    >
      <div className="flex flex-col w-full gap-2 lg:flex-row">
        <div className="w-full text-xs font-light duration-75 cursor-pointer lg:text-sm xl:text-base">
          <button
            className="dont-break-out hover:bg-gray-800 rounded-button"
            onClick={() => handleCopyAddress(owner_address)}
          >
            {owner_address}
          </button>
          <div className="underline">
            <Link to={`/${ROTUES.accounts}/${owner_address}`}>Checkout</Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full lg:justify-end">
          <div className="flex gap-2">
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
      </div>

      <div>
        <div className="text-xl font-medium">{role}</div>
        <div className="-mt-1 font-light">{experience}</div>
        <div className="mt-2 text-sm text-opacity-60 text-secondary">{company_name}</div>
        <div>{opinion}</div>
        <div className="font-light">{parseDateFns(Number(created_at))}</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <InfoBox name="Last salary" value={`${Number(last)} ${salary_currency}`} />
        <InfoBox name="First salary" value={`${Number(first)} ${salary_currency}`} />
        <InfoBox name="Speed of growth" value={Number(speed_of_growth)} />
        <InfoBox name="Location" value={location} />
        <InfoBox name="Employment type" value={employment_type} />
        <InfoBox name="Operating mode" value={operating_mode} />
        <InfoBox name="Experience in company" value={`${Number(experience_in_company)} months`} />
        <InfoBox name="Experience" value={`${Number(experience)} months`} />
      </div>
    </motion.div>
  );
};

export default CompaniesSalaryItem;
