import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSecretInfos } from 'smart-contracts/passing-secret-info/slice';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import { convertEthGweiWei } from 'utils/helpers/convert';
import { SearchInputProps } from './search-input';

const searchBySingleWord = (a: string, b: string) => {
  return a
    .toLocaleLowerCase()
    .split(' ')
    .some((word) =>
      b
        .toLocaleLowerCase()
        .split(' ')
        .some((secondWord) => word.includes(secondWord))
    );
};

const useSearchInput = ({ setEntities }: SearchInputProps) => {
  const secretInfos = useSelector(getSecretInfos);
  const [result, setResult] = useState<SecretInfo[]>([]);
  const [value, setValue] = useState('');

  const search = (type: 'tip' | 'result') => {
    if (value === '') {
      setResult([]);
      setEntities(secretInfos);
      return;
    }

    const searchedSecretInfos: SecretInfo[] = [];
    secretInfos.forEach(([secret_info_id, owner_address, amount, title, description]) => {
      if (
        owner_address.toLocaleLowerCase().includes(value) ||
        searchBySingleWord(convertEthGweiWei(amount), value) ||
        searchBySingleWord(title, value) ||
        searchBySingleWord(description, value)
      ) {
        searchedSecretInfos.push(secretInfos[secret_info_id]);
      }
    });

    if (type === 'tip') {
      setResult(searchedSecretInfos.splice(0, 5));
    }

    if (type === 'result') {
      setResult([]);
      setEntities(searchedSecretInfos);
    }
  };

  const setEntitiesById = (id: number) => {
    setEntities([secretInfos[id]]);
    setResult([]);
  };

  useEffect(() => {
    search('tip');
  }, [value]);

  return {
    result,
    setValue,
    setEntitiesById,
    search,
  };
};

export default useSearchInput;
