import { Loading, SearchInput } from 'features/components';
import { ErrorMessage, IsOwnerCheckbox, Sort } from 'features/components';
import { SecretInfoList } from 'features/secret-infos';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  getAccessedIds,
  getManipulatedSecretInfos,
  getSecretInfosStatus,
} from 'smart-contracts/passing-secret-info/slice';
import { PASSING_SECRET_INFO_TYPES } from 'smart-contracts/passing-secret-info/types';
import { ResponseStatus } from 'utils/types/api';

const SecretInfosAccessed: FC = () => {
  const status = useSelector(getSecretInfosStatus);
  const secretInfos = useSelector(getManipulatedSecretInfos);
  const accessedIds = useSelector(getAccessedIds);
  const secretInfosAccesseed = [...secretInfos].filter(([secret_info_id]) =>
    accessedIds.some((accessedId) => accessedId === secret_info_id)
  );

  if (status === ResponseStatus.FAILED) return <ErrorMessage />;
  if (status === ResponseStatus.PENDING) return <Loading />;

  return (
    <>
      <section className="flex flex-wrap items-center gap-2 lg:gap-4 xl:gap-8">
        <SearchInput type={PASSING_SECRET_INFO_TYPES.SECRET_INFO} />
        <Sort type={PASSING_SECRET_INFO_TYPES.SECRET_INFO} />
        <IsOwnerCheckbox type={PASSING_SECRET_INFO_TYPES.SECRET_INFO} />
      </section>

      <SecretInfoList secretInfos={secretInfosAccesseed} accessed />
    </>
  );
};

export default SecretInfosAccessed;
