import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalLayout } from 'features/ui';
import CloseModal from 'features/ui/close-modal/close-modal';
import React, { FC } from 'react';

export interface SecretInfoAccessedContentModalProps {
  title: string;
  info: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SecretInfoAccessedContentModal: FC<SecretInfoAccessedContentModalProps> = ({
  title,
  info,
  setIsModalOpen,
}) => {
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
          <p className="mt-4 text-black">{info}</p>
        </div>
      </div>
    </ModalLayout>
  );
};

export default SecretInfoAccessedContentModal;
