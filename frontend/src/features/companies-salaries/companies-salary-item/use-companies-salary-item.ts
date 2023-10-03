import { useSelector } from 'react-redux';
import { CompaniesSalaryItemProps } from './companies-salary-item';
import { getAccount } from 'smart-contracts/slice';
import { companiesSalariesContract } from 'smart-contracts/companies-salaries/actions';

const useCompaniesSalaryItem = ({
  salary: [
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
    rates
  ],
}: CompaniesSalaryItemProps) => {
  const account = useSelector(getAccount);
  const positiveRates = rates.filter(([id, owner_address, rate]) => rate === true).length;
  const negativeRates = rates.length - positiveRates;
  const currentRateArray = rates.filter(
    ([id, owner_address, rate]) => owner_address.toLocaleLowerCase() === account.toLocaleLowerCase()
  );
  const currentRate = currentRateArray.length > 0 ? currentRateArray[0] : null;

  const like = async () => {
    if (currentRate && currentRate[2]) {
      await companiesSalariesContract.removeSalaryRate(Number(salary_id));
      return;
    }

    if (currentRate && !currentRate[2]) {
      await companiesSalariesContract.changeSalaryRate(Number(salary_id));
      return;
    }

    await companiesSalariesContract.addSalaryRate(Number(salary_id), true);
  };

  const unlike = async () => {
    if (currentRate && !currentRate[2]) {
      await companiesSalariesContract.removeSalaryRate(Number(salary_id));
      return;
    }

    if (currentRate && currentRate[2]) {
      await companiesSalariesContract.changeSalaryRate(Number(salary_id));
    }

    await companiesSalariesContract.addSalaryRate(Number(salary_id), false);
  };

  return {
    positiveRates,
    negativeRates,
    currentRate,
    like,
    unlike,
  };
};

export default useCompaniesSalaryItem;
