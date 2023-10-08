import { SearchInput } from 'features/components';
import IsOwnerCheckbox from 'features/components/is-owner-checkbox/is-owner-checkbox';
import Sort from 'features/components/sort/sort';
import { SecretInfoList, CreateSecretInfoForm } from 'features/secret-infos';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { getManipulatedSecretInfos } from 'smart-contracts/passing-secret-info/slice';
import { SMART_CONTRACTS_DATA_ENUM } from 'smart-contracts/types';

const SecretInfos: FC = () => {
  const secretInfos = useSelector(getManipulatedSecretInfos);
  const [isCreateSecretInfoModalOpen, setIsCreateSecretInfoModalOpen] = useState(false);

  return (
    <>
      {isCreateSecretInfoModalOpen ? (
        <CreateSecretInfoForm setIsModalOpen={setIsCreateSecretInfoModalOpen} />
      ) : null}

      <section className="flex flex-wrap items-center gap-2 lg:gap-4 xl:gap-8">
        <SearchInput type={SMART_CONTRACTS_DATA_ENUM.SECRET_INFO} />
        <Sort type={SMART_CONTRACTS_DATA_ENUM.SECRET_INFO} />
        <IsOwnerCheckbox type={SMART_CONTRACTS_DATA_ENUM.SECRET_INFO} />
        <button onClick={() => setIsCreateSecretInfoModalOpen(true)} className="button">
          Create secret info
        </button>
      </section>

      <SecretInfoList secretInfos={secretInfos} accessed={false} />
    </>
  );
};

export default SecretInfos;
