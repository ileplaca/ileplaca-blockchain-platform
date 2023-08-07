import { SortProps } from './sort';
import { PASSING_SECRET_INFO_TYPES } from 'smart-contracts/passing-secret-info/types';
import { SortEnum } from './sort.types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getManipulatedSecretInfos,
  getManipulatedSecretInfosAccessed,
  setManipulatedSecretInfos,
  setManipulatedSecretInfosAccessed,
} from 'smart-contracts/passing-secret-info/slice';

const useSort = ({ type }: SortProps) => {
  const dispatch = useDispatch();
  const secretInfos = useSelector(getManipulatedSecretInfos);
  const secretInfosAccessed = useSelector(getManipulatedSecretInfosAccessed);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case SortEnum.LATEST: {
        if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
          const sorted = [...secretInfos].sort((a, b) => Number(b[0]) - Number(a[0]));
          dispatch(setManipulatedSecretInfos(sorted));
        }

        if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED) {
          const sorted = [...secretInfosAccessed].sort(
            ([AsecretInfo], [BsecretInfo]) => Number(BsecretInfo[0]) - Number(AsecretInfo[0])
          );
          dispatch(setManipulatedSecretInfosAccessed(sorted));
        }

        break;
      }

      case SortEnum.OLDEST: {
        if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
          const sorted = [...secretInfos].sort((a, b) => Number(a[0]) - Number(b[0]));
          dispatch(setManipulatedSecretInfos(sorted));
        }

        if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED) {
          const sorted = [...secretInfosAccessed].sort(
            ([AsecretInfo], [BsecretInfo]) => Number(AsecretInfo[0]) - Number(BsecretInfo[0])
          );
          dispatch(setManipulatedSecretInfosAccessed(sorted));
        }

        break;
      }

      case SortEnum.PRICE_ASCENDING: {
        if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
          const sorted = [...secretInfos].sort((a, b) => Number(b[2]) - Number(a[2]));
          dispatch(setManipulatedSecretInfos(sorted));
        }

        if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED) {
          const sorted = [...secretInfosAccessed].sort(
            ([AsecretInfo], [BsecretInfo]) => Number(BsecretInfo[2]) - Number(AsecretInfo[2])
          );
          dispatch(setManipulatedSecretInfosAccessed(sorted));
        }

        break;
      }

      case SortEnum.PRICE_DESCENDING: {
        if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
          const sorted = [...secretInfos].sort((a, b) => Number(a[2]) - Number(b[2]));
          dispatch(setManipulatedSecretInfos(sorted));
        }

        if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED) {
          const sorted = [...secretInfosAccessed].sort(
            ([AsecretInfo], [BsecretInfo]) => Number(AsecretInfo[2]) - Number(BsecretInfo[2])
          );
          dispatch(setManipulatedSecretInfosAccessed(sorted));
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
