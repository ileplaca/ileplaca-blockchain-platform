import { ethers } from 'ethers';
import { SearchInput } from 'features/components';
import Sort from 'features/components/sort/sort';
import { SecretInfoList, CreateSecretInfoForm } from 'features/secret-infos';
import { ModalLayout } from 'features/ui';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getSecretInfos,
  getSecretInfosError,
  getSecretInfosStatus,
} from 'smart-contracts/passing-secret-info/slice';
import { ResponseStatus } from 'utils/types/api';

const SecretInfos: FC = () => {
  const error = useSelector(getSecretInfosError);
  const status = useSelector(getSecretInfosStatus);
  const secretInfosCopy = useSelector(getSecretInfos);
  const [secretInfos, setSecretInfos] = useState([...secretInfosCopy]);
  const [isCreateSecretInfoModalOpen, setIsCreateSecretInfoModalOpen] = useState(false);

  useEffect(() => {
    console.log(secretInfos[0]);
  }, [secretInfos]);

  if (status === ResponseStatus.PENDING) return <>Loading...</>;
  if (status === ResponseStatus.FAILED) return <>{error}</>;

  return (
    <>
      {isCreateSecretInfoModalOpen ? (
        <ModalLayout>
          <CreateSecretInfoForm setIsModalOpen={setIsCreateSecretInfoModalOpen} />
        </ModalLayout>
      ) : null}

      <section className="flex items-center gap-8">
        <SearchInput setEntities={setSecretInfos} />
        <Sort setEntities={setSecretInfos} />
        <button
          onClick={() => setIsCreateSecretInfoModalOpen(true)}
          className="px-4 py-3 font-medium duration-100 rounded-button bg-primary hover:bg-primary-hover"
        >
          Create secret info
        </button>
      </section>

      {/* <button onClick={() => passingSecretInfoContract.addSecretInfo(
        ethers.parseEther('0.01'),
        "Inside info COLIAN, ile sprzedaja jakie perspektywy",
        "Wszystko co musisz wiedziec, zeby zarobic na COLIAN",
        100,
        "Wychodz z tego bo to cyrk na kolkach tylko udaja ze jest wszystko w porzadku, jak jebnie to do zera i bankructwo mimo ze to spolka panstwa"
      )}>
        add
      </button> */}

      <SecretInfoList secretInfos={secretInfos} />
    </>
  );
};

export default SecretInfos;
