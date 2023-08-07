import { SearchInput } from 'features/components';
import IsOwnerCheckbox from 'features/components/is-owner-checkbox/is-owner-checkbox';
import Sort from 'features/components/sort/sort';
import SecretInfoAccessedList from 'features/secret-infos-accessed/secret-info-accessed-list/secret-info-accessed-list';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  getManipulatedSecretInfosAccessed,
  getSecretInfosAccessed,
  getSecretInfosError,
  getSecretInfosStatus,
} from 'smart-contracts/passing-secret-info/slice';
import { PASSING_SECRET_INFO_TYPES } from 'smart-contracts/passing-secret-info/types';
import { ResponseStatus } from 'utils/types/api';

const SecretInfosAccessed: FC = () => {
  const error = useSelector(getSecretInfosError);
  const status = useSelector(getSecretInfosStatus);
  const secretInfosAccessed = useSelector(getManipulatedSecretInfosAccessed);

  if (status === ResponseStatus.PENDING) return <>Loading...</>;
  if (status === ResponseStatus.FAILED) return <>{error}</>;

  return (
    <>
      <section className="flex items-center gap-8">
        <SearchInput type={PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED} />
        <Sort type={PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED} />
        <IsOwnerCheckbox type={PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED} />
      </section>

      <SecretInfoAccessedList secretInfosAccessedResponse={secretInfosAccessed} />
    </>
  );
};

export default SecretInfosAccessed;
