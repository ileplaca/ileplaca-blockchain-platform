import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalLayout } from 'features/ui';
import CloseModal from 'features/ui/close-modal/close-modal';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';

export interface SecretInfoAccessedContentModalProps {
  title: string;
  secret_info_id: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SecretInfoAccessedContentModal: FC<SecretInfoAccessedContentModalProps> = ({
  title,
  secret_info_id,
  setIsModalOpen,
}) => {
  const { data, isLoading } = useQuery(`secret-infos-accessed/${secret_info_id}`, () => passingSecretInfoContract.getSecretInfoAccessedById(BigInt(secret_info_id)))

  return (
    <ModalLayout>
      <div
        className="max-h-96"
        style={{
          maxHeight: '75vh',
        }}
      >
        <div className="flex flex-row items-center justify-between text-black">
          <h1 className="text-xl font-medium">{title}</h1>
          <CloseModal setIsModalOpen={setIsModalOpen} />
        </div>
        <div
          className="mt-2 overflow-auto"
          style={{
            maxHeight: '60vh',
          }}
        >
          <div className='text-black'>
            {secret_info_id}
            {isLoading ? "Loading..." : data}
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default SecretInfoAccessedContentModal;
