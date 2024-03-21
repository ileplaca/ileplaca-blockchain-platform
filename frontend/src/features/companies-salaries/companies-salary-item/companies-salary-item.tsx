import React, { FC } from 'react';
import { Salary } from 'smart-contracts/companies-salaries/types';
import { parseDateFns } from 'utils/constans/date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import useCompaniesSalaryItem from './use-companies-salary-item';
import { motion } from 'framer-motion';
import { handleCopyAddress } from 'utils/helpers/alert';
import { Link } from 'react-router-dom';
import { ROTUES } from 'utils/types/routes';
import { ComponentInfoBox, OwnerAddressSection, ReplyAndRateSection } from 'features/components';

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
        <OwnerAddressSection owner_address={owner_address} />
        <ReplyAndRateSection
          like={like}
          unlike={unlike}
          currentRate={currentRate}
          negativeRates={negativeRates}
          positiveRates={positiveRates}
        />
      </div>

      <div>
        <div className="text-xl font-medium">{role}</div>
        <div className="-mt-1 font-light">{experience}</div>
        <div className="mt-2 text-sm text-opacity-60 text-secondary">{company_name}</div>
        <div>{opinion}</div>
        <div className="font-light">{parseDateFns(Number(created_at))}</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ComponentInfoBox name="Last salary" value={`${Number(last)} ${salary_currency}`} />
        <ComponentInfoBox name="First salary" value={`${Number(first)} ${salary_currency}`} />
        <ComponentInfoBox name="Speed of growth" value={Number(speed_of_growth)} />
        <ComponentInfoBox name="Location" value={location} />
        <ComponentInfoBox name="Employment type" value={employment_type} />
        <ComponentInfoBox name="Operating mode" value={operating_mode} />
        <ComponentInfoBox
          name="Experience in company"
          value={`${Number(experience_in_company)} months`}
        />
        <ComponentInfoBox name="Experience" value={`${Number(experience)} months`} />
      </div>
    </motion.div>
  );
};

export default CompaniesSalaryItem;
