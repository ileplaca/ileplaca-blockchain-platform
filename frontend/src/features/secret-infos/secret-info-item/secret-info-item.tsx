import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import { parseDateFns } from 'utils/constans/date-fns';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { convertEthGweiWei } from 'utils/helpers/convert';
import useSecretItem from './use-secret-item';
import { SecretInfoPayModal } from 'features/secret-infos';
import { ModalLayout } from 'features/ui';
import { motion } from 'framer-motion';
import SecretInfoRepliesModal from '../secret-info-replies-modal/secret-info-replies-modal';

export interface SecretInfoItemProps {
  secretInfo: SecretInfo;
}

const SecretInfoItem: FC<SecretInfoItemProps> = ({ secretInfo }) => {
  const [
    secret_info_id,
    owner_address,
    amount,
    title,
    description,
    created_at,
    max_uses,
    current_uses,
    replies,
    rates,
  ] = secretInfo;
  const {
    positiveRates,
    negativeRates,
    currentRate,
    like,
    unlike,
    isRepliesModalOpen,
    setIsRespliesModalOpen,
    isPayModalOpen,
    setIsPayModalOpen,
  } = useSecretItem({ secretInfo });

  return (
    <div className="w-full p-6 mt-10 border border-gray-600 rounded text-text">
      {isRepliesModalOpen ? (
        <ModalLayout>
          <SecretInfoRepliesModal
            setIsModalOpen={setIsRespliesModalOpen}
            replies={replies}
            secret_info_id={secret_info_id}
          />
        </ModalLayout>
      ) : null}
      
      {isPayModalOpen ? (
        <ModalLayout>
          <SecretInfoPayModal
            setIsModalOpen={setIsPayModalOpen}
            amount={convertEthGweiWei(amount)}
            action={() =>
              passingSecretInfoContract.payForSecretInfoAccess(secret_info_id, { value: amount })
            }
          />
        </ModalLayout>
      ) : null}

      <div className="flex flex-row">
        <div className="w-full text-sm font-light dont-break-out">{owner_address}</div>
        <div className="flex flex-row items-center justify-end w-full gap-4">
          <button onClick={() => setIsRespliesModalOpen(true)} className="duration-75 cursor-pointer text-text hover:text-primary-text">
            Reply {`(${replies.length})`}
          </button>
          <motion.button
            whileHover={{
              rotate: [0, 20, 0],
              transition: {
                duration: 0.125,
              },
            }}
            onClick={like}
            className={`hover:text-green-400 duration-75 ${
              currentRate?.[2] ? 'text-green-500' : ''
            }`}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> {positiveRates}
          </motion.button>
          <motion.button
            whileHover={{
              rotate: [0, 20, 0],
              transition: {
                duration: 0.125,
              },
            }}
            onClick={unlike}
            className={`hover:text-red-400 duration-75 ${
              currentRate?.[2] === false ? 'text-red-500' : ''
            }`}
          >
            <FontAwesomeIcon icon={faThumbsDown} /> {negativeRates}
          </motion.button>
        </div>
      </div>

      <div className="text-xl font-medium">{title}</div>
      <div>{description}</div>
      <div className="font-light">{parseDateFns(new Date(Number(created_at) * 1000))}</div>

      <div className="flex flex-wrap items-center gap-4 mt-2">
        <div className="px-2 py-1 border border-gray-500 rounded-button">
          <span className="font-light">Left to buy </span>
          {Number(max_uses) - Number(current_uses)}
        </div>
        <div className="px-2 py-1 border border-gray-500 rounded-button">
          <span className="font-light">Already bought </span>
          {Number(current_uses)}
        </div>
      </div>
      <motion.button
        whileHover={{
          transition: {
            duration: 0.05,
          },
          rotate: [0, 5, 0],
        }}
        className="px-6 py-2 mt-4 font-medium duration-75 hover:bg-primary-hover bg-primary rounded-button"
        onClick={() => setIsPayModalOpen(true)}
      >
        Buy for {convertEthGweiWei(amount)}
      </motion.button>
    </div>
  );
};

export default SecretInfoItem;
