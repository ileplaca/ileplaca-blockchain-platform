import { SearchInput } from 'features/components';
import { IsOwnerCheckbox, Sort } from 'features/components';
import { SecretInfoList } from 'features/secret-infos';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  getAccessedIds,
  getManipulatedSecretInfos,
} from 'smart-contracts/passing-secret-info/slice';
import { SMART_CONTRACTS_DATA_ENUM } from 'smart-contracts/types';

const SecretInfosAccessed: FC = () => {
  const secretInfos = useSelector(getManipulatedSecretInfos);
  const accessedIds = useSelector(getAccessedIds);
  const secretInfosAccesseed = [...secretInfos].filter(([secret_info_id]) =>
    accessedIds.some((accessedId) => accessedId === secret_info_id)
  );

  return (
    <>
      <section className="flex flex-wrap items-center gap-2 lg:gap-4 xl:gap-8">
        <SearchInput type={SMART_CONTRACTS_DATA_ENUM.SECRET_INFO} />
        <Sort type={SMART_CONTRACTS_DATA_ENUM.SECRET_INFO} />
        {/* <IsOwnerCheckbox type={SMART_CONTRACTS_DATA_ENUM.SECRET_INFO} /> */}
      </section>

      <SecretInfoList secretInfos={secretInfosAccesseed} accessed />
    </>
  );
};

export default SecretInfosAccessed;
