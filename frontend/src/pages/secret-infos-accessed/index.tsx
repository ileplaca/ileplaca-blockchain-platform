import { Loading, SearchInput } from 'features/components';
import { ErrorMessage, IsOwnerCheckbox, Sort } from 'features/components';
import { SecretInfoAccessedList } from 'features/secret-infos-accessed';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  getManipulatedSecretInfosAccessed,
  getSecretInfosStatus,
} from 'smart-contracts/passing-secret-info/slice';
import { PASSING_SECRET_INFO_TYPES } from 'smart-contracts/passing-secret-info/types';
import { ResponseStatus } from 'utils/types/api';

const SecretInfosAccessed: FC = () => {
  const status = useSelector(getSecretInfosStatus);
  const secretInfosAccessed = useSelector(getManipulatedSecretInfosAccessed);

  if (status === ResponseStatus.FAILED) return <ErrorMessage />;
  if (status === ResponseStatus.PENDING) return <Loading />;

  return (
    <>
      <section className="flex flex-wrap items-center gap-2 lg:gap-4 xl:gap-8">
        <SearchInput type={PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED} />
        <Sort type={PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED} />
        <IsOwnerCheckbox type={PASSING_SECRET_INFO_TYPES.SECRET_INFO_ACCESSED} />
      </section>

      <SecretInfoAccessedList secretInfosAccessedResponse={secretInfosAccessed} />
    </>
  );
};

export default SecretInfosAccessed;
