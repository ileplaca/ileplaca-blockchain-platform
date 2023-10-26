import { SMART_CONTRACTS_DATA_ENUM } from 'smart-contracts/types';
import { SortProps } from './sort';
import { SortEnum } from './sort.types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getManipulatedSecretInfos,
  setManipulatedSecretInfos,
} from 'smart-contracts/passing-secret-info/slice';
import {
  getManipulatedCompaniesSalaries,
  setManipulatedCompaniesSalaries,
} from 'smart-contracts/companies-salaries/slice';

const useSort = ({ type }: SortProps) => {
  const dispatch = useDispatch();
  const secretInfos = useSelector(getManipulatedSecretInfos);
  const companiesSalaries = useSelector(getManipulatedCompaniesSalaries);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case SortEnum.LATEST: {
        if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
          const sorted = [...secretInfos].sort((a, b) => Number(b[0]) - Number(a[0]));
          dispatch(setManipulatedSecretInfos(sorted));
        }
        if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
          const sorted = [...companiesSalaries].sort((a, b) => Number(b[0]) - Number(a[0]));
          dispatch(setManipulatedCompaniesSalaries(sorted));
        }

        break;
      }

      case SortEnum.OLDEST: {
        if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
          const sorted = [...secretInfos].sort((a, b) => Number(a[0]) - Number(b[0]));
          dispatch(setManipulatedSecretInfos(sorted));
        }
        if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
          const sorted = [...companiesSalaries].sort((a, b) => Number(a[0]) - Number(b[0]));
          dispatch(setManipulatedCompaniesSalaries(sorted));
        }

        break;
      }

      case SortEnum.PRICE_ASCENDING: {
        if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
          const sorted = [...secretInfos].sort((a, b) => Number(b[2]) - Number(a[2]));
          dispatch(setManipulatedSecretInfos(sorted));
        }
        if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
          const sorted = [...companiesSalaries].sort((a, b) => Number(b[2]) - Number(a[2]));
          dispatch(setManipulatedCompaniesSalaries(sorted));
        }

        break;
      }

      case SortEnum.PRICE_DESCENDING: {
        if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
          const sorted = [...secretInfos].sort((a, b) => Number(a[2]) - Number(b[2]));
          dispatch(setManipulatedSecretInfos(sorted));
        }
        if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
          const sorted = [...companiesSalaries].sort((a, b) => Number(a[2]) - Number(b[2]));
          dispatch(setManipulatedCompaniesSalaries(sorted));
        }

        break;
      }
    }
  };

  return {
    handleOnChange,
  };
};

export default useSort;
