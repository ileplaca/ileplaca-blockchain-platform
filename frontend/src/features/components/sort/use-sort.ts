import { useSelector } from 'react-redux';
import { getSecretInfos } from 'smart-contracts/passing-secret-info/slice';
import { SortProps } from './sort';

export enum SortEnum {
  LATEST = 'Latest',
  OLDEST = 'Oldest',
  PRICE_ASCENDING = 'Price ascending',
  PRICE_DESCENDING = 'Price descending',
}
export type SortType = `${SortEnum}`;
export const sortTypes = Object.values(SortEnum);

const useSort = ({ setEntities }: SortProps) => {
  const secretInfos = useSelector(getSecretInfos);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case SortEnum.LATEST: {
        const sorted = [...secretInfos].sort((a, b) => Number(b[0]) - Number(a[0]));
        setEntities(sorted);
        break;
      }

      case SortEnum.OLDEST: {
        const sorted = [...secretInfos].sort((a, b) => Number(a[0]) - Number(b[0]));
        setEntities(sorted);
        break;
      }

      case SortEnum.PRICE_ASCENDING: {
        const sorted = [...secretInfos].sort((a, b) => Number(b[2]) - Number(a[2]));
        setEntities(sorted);
        break;
      }

      case SortEnum.PRICE_DESCENDING: {
        const sorted = [...secretInfos].sort((a, b) => Number(a[2]) - Number(b[2]));
        setEntities(sorted);
        break;
      }
    }
  };

  return {
    handleOnChange,
  };
};

export default useSort;
