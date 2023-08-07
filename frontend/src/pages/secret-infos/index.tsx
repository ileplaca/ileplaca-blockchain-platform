import { ethers } from 'ethers';
import { Loading, SearchInput } from 'features/components';
import IsOwnerCheckbox from 'features/components/is-owner-checkbox/is-owner-checkbox';
import Sort from 'features/components/sort/sort';
import { SecretInfoList, CreateSecretInfoForm } from 'features/secret-infos';
import { ModalLayout } from 'features/ui';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getManipulatedSecretInfos,
  getSecretInfos,
  getSecretInfosError,
  getSecretInfosStatus,
} from 'smart-contracts/passing-secret-info/slice';
import { PASSING_SECRET_INFO_TYPES } from 'smart-contracts/passing-secret-info/types';
import { ResponseStatus } from 'utils/types/api';

const SecretInfos: FC = () => {
  const error = useSelector(getSecretInfosError);
  const status = useSelector(getSecretInfosStatus);
  const secretInfos = useSelector(getManipulatedSecretInfos);
  const [isCreateSecretInfoModalOpen, setIsCreateSecretInfoModalOpen] = useState(false);

  if (status === ResponseStatus.PENDING) return <Loading />;
  if (status === ResponseStatus.FAILED) return <>{error}</>;

  return (
    <>
      {isCreateSecretInfoModalOpen ? (
        <ModalLayout>
          <CreateSecretInfoForm setIsModalOpen={setIsCreateSecretInfoModalOpen} />
        </ModalLayout>
      ) : null}

      <section className="flex flex-wrap items-center gap-8">
        <SearchInput type={PASSING_SECRET_INFO_TYPES.SECRET_INFO} />
        <Sort type={PASSING_SECRET_INFO_TYPES.SECRET_INFO} />
        <IsOwnerCheckbox type={PASSING_SECRET_INFO_TYPES.SECRET_INFO} />
        <button
          onClick={() => setIsCreateSecretInfoModalOpen(true)}
          className="px-4 py-3 font-medium duration-100 rounded-button bg-primary hover:bg-primary-hover"
        >
          Create secret info
        </button>
      </section>

      <SecretInfoList secretInfos={secretInfos} />
    </>
  );
};

export default SecretInfos;
