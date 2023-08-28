import { useDispatch, useSelector } from 'react-redux';
import {
  getSecretInfos,
  getSecretInfosAccessed,
  setManipulatedSecretInfos,
  setManipulatedSecretInfosAccessed,
} from 'smart-contracts/passing-secret-info/slice';
import { PASSING_SECRET_INFO_TYPES } from 'smart-contracts/passing-secret-info/types';
import { getAccount } from 'smart-contracts/slice';
import { IsOwnerCheckboxProps } from './is-owner-checkbox';

const useIsOwnerCheckbox = ({ type }: IsOwnerCheckboxProps) => {
  const dispatch = useDispatch();
  const account = useSelector(getAccount);
  const secretInfos = useSelector(getSecretInfos);
  const secretInfosAccessed = useSelector(getSecretInfosAccessed);

  const handleOnChange = (checked: boolean) => {
    if (checked) {
      if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
        return dispatch(setManipulatedSecretInfos(secretInfos));
      }

      if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED) {
        return dispatch(setManipulatedSecretInfosAccessed(secretInfosAccessed));
      }
    }

    if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
      const secretInfosWithoutOwner = secretInfos.filter(
        (secretInfo) => secretInfo[1].toLocaleLowerCase() !== account.toLocaleLowerCase()
      );
      return dispatch(setManipulatedSecretInfos(secretInfosWithoutOwner));
    }

    if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED) {
      const secretInfosWithoutOwner = secretInfosAccessed.filter(
        ([secretInfo]) => secretInfo[1].toLocaleLowerCase() !== account.toLocaleLowerCase()
      );
      return dispatch(setManipulatedSecretInfosAccessed(secretInfosWithoutOwner));
    }
  };

  return {
    handleOnChange,
  };
};

export default useIsOwnerCheckbox;
