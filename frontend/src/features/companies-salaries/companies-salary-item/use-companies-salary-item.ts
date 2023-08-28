import { useSelector } from 'react-redux';
import { CompaniesSalaryItemProps } from './companies-salary-item';
import { getAccount } from 'smart-contracts/slice';
import { companiesSalariesContract } from 'smart-contracts/companies-salaries/actions';

const useCompaniesSalaryItem = ({
  salary: [
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
      await companiesSalariesContract.removeSalaryRate(salary_id);
      return;
    }

    if (currentRate && !currentRate[2]) {
      await companiesSalariesContract.changeSalaryRate(salary_id);
      return;
    }

    await companiesSalariesContract.addSalaryRate(salary_id, true);
  };

  const unlike = async () => {
    if (currentRate && !currentRate[2]) {
      await companiesSalariesContract.removeSalaryRate(salary_id);
      return;
    }

    if (currentRate && currentRate[2]) {
      await companiesSalariesContract.changeSalaryRate(salary_id);
    }

    await companiesSalariesContract.addSalaryRate(salary_id, false);
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
