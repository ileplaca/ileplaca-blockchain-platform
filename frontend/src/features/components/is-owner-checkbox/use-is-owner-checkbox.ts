import { useDispatch, useSelector } from 'react-redux';
import {
  getSecretInfos,
  setManipulatedSecretInfos,
} from 'smart-contracts/passing-secret-info/slice';
import { PASSING_SECRET_INFO_TYPES } from 'smart-contracts/passing-secret-info/types';
import { getAccount } from 'smart-contracts/slice';
import { IsOwnerCheckboxProps } from './is-owner-checkbox';

const useIsOwnerCheckbox = ({ type }: IsOwnerCheckboxProps) => {
  const dispatch = useDispatch();
  const account = useSelector(getAccount);
  const secretInfos = useSelector(getSecretInfos);

  const handleOnChange = (checked: boolean) => {
    if (checked) {
      if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
        return dispatch(setManipulatedSecretInfos(secretInfos));
      }
    }

    if (type === PASSING_SECRET_INFO_TYPES.SECRET_INFO) {
      const secretInfosWithoutOwner = secretInfos.filter(
        (secretInfo) => secretInfo[1].toLocaleLowerCase() !== account.toLocaleLowerCase()
      );
      return dispatch(setManipulatedSecretInfos(secretInfosWithoutOwner));
    }
  };

  return {
    handleOnChange,
  };
};

export default useIsOwnerCheckbox;
