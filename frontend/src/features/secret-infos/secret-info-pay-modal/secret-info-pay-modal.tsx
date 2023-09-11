import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalLayout } from 'features/ui';
import React, { FC } from 'react';

export interface SecretInfoModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
  action: () => void;
}

const SecretInfosModal: FC<SecretInfoModalProps> = ({ setIsModalOpen, amount, action }) => {
  return (
    <ModalLayout>
      <h1 className="text-2xl font-semibold text-black">Are you sure?</h1>

      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-lg text-yellow-600" />
          <span className="text-sm text-black">
            Make sure before you buy that this information is not a scam.
          </span>
        </div>

        <div className="flex gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-lg text-yellow-600" />
          <span className="text-sm text-black">
            The information will be permanently assigned to your wallet.
          </span>
        </div>

        <div className="flex gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-lg text-yellow-600" />
          <span className="text-sm text-black">
            The cost of this information is {amount} + gas fee
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={action} className="button-approve focus:bg-green-700">
          Yes, {"I'm"} sure
        </button>

        <button onClick={() => setIsModalOpen(false)} className="button-cancel">
          No, cancel
        </button>
      </div>
    </ModalLayout>
  );
};

export default SecretInfosModal;
