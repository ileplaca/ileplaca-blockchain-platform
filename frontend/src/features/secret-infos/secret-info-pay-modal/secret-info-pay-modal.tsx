import { faExclamation, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';

export interface SecretInfoModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
  action: () => void;
}

const SecretInfosModal: FC<SecretInfoModalProps> = ({ setIsModalOpen, amount, action }) => {
  return (
    <motion.div
      animate={{ y: [200, 0] }}
      className="bg-text rounded-button py-8 px-8 flex flex-col justify-between gap-4"
    >
      <h1 className="text-black text-2xl font-semibold">Are you sure?</h1>

      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-lg text-yellow-600" />
          <span className="text-black text-sm">
            Make sure before you buy that this information is not a scam.
          </span>
        </div>

        <div className="flex gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-lg text-yellow-600" />
          <span className="text-black text-sm">
            The information will be permanently assigned to your wallet.
          </span>
        </div>

        <div className="flex gap-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-lg text-yellow-600" />
          <span className="text-black text-sm">
            The cost of this information is {amount} + gas fee
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={action}
          className="bg-green-600 border border-green-600 hover:border-green-700 hover:bg-green-700 duration-75 py-2 px-4 rounded-button"
        >
          Yes, {"I'm"} sure
        </button>

        <button
          onClick={() => setIsModalOpen(false)}
          className="border text-black hover:bg-primary-text hover:duration-75 border-black duration-75 py-2 px-4 rounded-button"
        >
          No, cancel
        </button>
      </div>
    </motion.div>
  );
};

export default SecretInfosModal;
