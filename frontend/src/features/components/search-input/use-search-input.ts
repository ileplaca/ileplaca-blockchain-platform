import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getManipulatedSecretInfos,
  getSecretInfos,
  setManipulatedSecretInfos,
} from 'smart-contracts/passing-secret-info/slice';
import { SecretInfo, SecretInfoAccessedResponse } from 'smart-contracts/passing-secret-info/types';
import { SearchInputProps } from './search-input';
import { searchAndPush } from 'utils/helpers/search';
import { SEARCH_TYPE, SearchType } from './search-inputs.types';
import { SMART_CONTRACTS_DATA_ENUM } from 'smart-contracts/types';
import { Salary } from 'smart-contracts/companies-salaries/types';
import {
  getCompaniesSalaries,
  setManipulatedCompaniesSalaries,
} from 'smart-contracts/companies-salaries/slice';

const useSearchInput = ({ type }: SearchInputProps) => {
  const secretInfos = useSelector(getSecretInfos);
  const companiesSalaries = useSelector(getCompaniesSalaries);
  const dispatch = useDispatch();
  const [result, setResult] = useState<SecretInfo[] | Salary[]>([]);
  const [value, setValue] = useState('');

  const search = (searchType: SearchType) => {
    console.log(value);
    if (value === '') {
      setResult([]);

      if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
        dispatch(setManipulatedSecretInfos(secretInfos));
      }

      if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
        dispatch(setManipulatedCompaniesSalaries(companiesSalaries));
      }

      return;
    }

    const searchedData: SecretInfo[] | Salary[] = [];
    if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
      searchAndPush(secretInfos, searchedData, value, type);
    }

    if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
      searchAndPush(companiesSalaries, searchedData, value, type);
    }

    if (searchType === SEARCH_TYPE.TIP) {
      setResult(searchedData.splice(0, 5) as any);
    }

    if (searchType === SEARCH_TYPE.RESULT) {
      setResult([]);
      if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
        dispatch(setManipulatedSecretInfos(searchedData as SecretInfo[]));
      }
      if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
        dispatch(setManipulatedCompaniesSalaries(searchedData as Salary[]));
      }
    }
  };

  const setEntitiesById = (id: number | bigint) => {
    if (type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO) {
      const index = secretInfos.findIndex(
        ([secret_info_id]) => Number(secret_info_id) === Number(id)
      );
      dispatch(setManipulatedSecretInfos([secretInfos[index]]));
    }

    if (type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY) {
      const index = companiesSalaries.findIndex(([salary_id]) => Number(salary_id) === Number(id));
      console.log('🚀 ~ file: use-search-input.ts:88 ~ setEntitiesById ~ index:', index);
      dispatch(setManipulatedCompaniesSalaries([companiesSalaries[index]]));
    }

    setResult([]);
  };

  useEffect(() => {
    search(SEARCH_TYPE.TIP);
  }, [value]);

  return {
    result,
    setValue,
    setEntitiesById,
    search,
  };
};

export default useSearchInput;
