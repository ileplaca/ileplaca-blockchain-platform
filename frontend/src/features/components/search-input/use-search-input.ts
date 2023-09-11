import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getManipulatedSecretInfos,
  getSecretInfos,
  setManipulatedSecretInfos,
} from 'smart-contracts/passing-secret-info/slice';
import {
  PASSING_SECRET_INFO_TYPES,
  SecretInfo,
  SecretInfoAccessedResponse,
} from 'smart-contracts/passing-secret-info/types';
import { SearchInputProps } from './search-input';
import { searchAndPushSecretInfos } from 'utils/helpers/search';
import { SEARCH_TYPE, SearchType } from './search-inputs.types';

const useSearchInput = ({ type }: SearchInputProps) => {
  const secretInfos = useSelector(getSecretInfos);
  const dispatch = useDispatch();
  const [result, setResult] = useState<SecretInfo[]>([]);
  const [value, setValue] = useState('');

  const search = (searchType: SearchType) => {
    if (value === '') {
      setResult([]);

      if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
        dispatch(setManipulatedSecretInfos(secretInfos));
      }

      return;
    }

    const searchedSecretInfos: SecretInfo[] | SecretInfoAccessedResponse[] = [];
    if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
      secretInfos.forEach((secretInfo, index) => {
        searchAndPushSecretInfos(
          secretInfos,
          searchedSecretInfos,
          secretInfo,
          value,
          PASSING_SECRET_INFO_TYPES.SECRET_INFO,
          index
        );
      });
    }

    if (searchType === SEARCH_TYPE.TIP) {
      if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
        setResult(searchedSecretInfos.splice(0, 5) as any);
      }
    }

    if (searchType === SEARCH_TYPE.RESULT) {
      setResult([]);
      if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
        dispatch(setManipulatedSecretInfos(searchedSecretInfos as SecretInfo[]));
      }
    }
  };

  const setEntitiesById = (id: number) => {
    if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
      const index = secretInfos.findIndex(
        ([secret_info_id]) => Number(secret_info_id) === Number(id)
      );
      dispatch(setManipulatedSecretInfos([secretInfos[index]]));
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
