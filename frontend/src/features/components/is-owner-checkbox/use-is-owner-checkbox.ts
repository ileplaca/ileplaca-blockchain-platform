import { useDispatch, useSelector } from 'react-redux';
import {
  getSecretInfos,
  setManipulatedSecretInfos,
} from 'smart-contracts/passing-secret-info/slice';
import { getAccount } from 'smart-contracts/slice';
import { IsOwnerCheckboxProps } from './is-owner-checkbox';
import { SMART_CONTRACTS_DATA_ENUM } from 'smart-contracts/types';
import { getCompaniesSalaries, setManipulatedCompaniesSalaries } from 'smart-contracts/companies-salaries/slice';

const useIsOwnerCheckbox = ({ type }: IsOwnerCheckboxProps) => {
  const dispatch = useDispatch();
  const account = useSelector(getAccount);
  const secretInfos = useSelector(getSecretInfos);
  const companiesSalaries = useSelector(getCompaniesSalaries);

  const handleOnChange = (checked: boolean) => {
    if (checked) {
      if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
        return dispatch(setManipulatedSecretInfos(secretInfos));
      }
      if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
        return dispatch(setManipulatedCompaniesSalaries(companiesSalaries));
      }
    }

    if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
      const secretInfosWithoutOwner = secretInfos.filter(
        (secretInfo) => secretInfo[1].toLocaleLowerCase() !== account.toLocaleLowerCase()
      );
      return dispatch(setManipulatedSecretInfos(secretInfosWithoutOwner));
    }
    if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
      const companiesSalariesWithoutOwner = companiesSalaries.filter(
        (companiesSalary) => companiesSalary[1].toLocaleLowerCase() !== account.toLocaleLowerCase()
      );
      return dispatch(setManipulatedCompaniesSalaries(companiesSalariesWithoutOwner));
    }
  };

  return {
    handleOnChange,
  };
};

export default useIsOwnerCheckbox;
