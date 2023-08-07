import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

export interface CloseModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CloseModal: FC<CloseModalProps> = ({ setIsModalOpen }) => {
  return (
    <button
      onClick={() => setIsModalOpen(false)}
      className="px-4 py-2 text-lg text-black duration-75 border border-gray-600 rounded-button hover:bg-primary-text"
    >
      <FontAwesomeIcon icon={faClose} />
    </button>
  );
};

export default CloseModal;
