import React, { FC } from 'react';
import {
  SecretInfo,
  SecretInfoAccessed,
  SecretInfoAccessedResponse,
} from 'smart-contracts/passing-secret-info/types';
import { motion } from 'framer-motion';
import useSecretItem from 'features/secret-infos/secret-info-item/use-secret-item';
import { ModalLayout } from 'features/ui';
import SecretInfoRepliesModal from 'features/secret-infos/secret-info-replies-modal/secret-info-replies-modal';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseDateFns } from 'utils/constans/date-fns';
import useSecretInfoAccessedItem from './use-secret-info-accessed-item';
import SecretInfoAccessedContentModal from '../secret-info-accessed-content-modal/secret-info-accessed-content-modal';
import { convertEthGweiWei } from 'utils/helpers/convert';
import SecretInfoAccessedStatsModal from '../secret-info-accessed-stats-modal/secret-info-accessed-stats-modal';
import { copy } from 'utils/helpers/copy';

export interface SecretInfoAccessedItemProps {
  secretInfo: SecretInfo;
  secretInfoAccessed: SecretInfoAccessed;
}

const SecretInfoAccessedItem: FC<SecretInfoAccessedItemProps> = ({
  secretInfo,
  secretInfoAccessed,
}) => {
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
  const [info, accessed_addresses] = secretInfoAccessed;
  const {
    like,
    unlike,
    isRepliesModalOpen,
    setIsRespliesModalOpen,
    currentRate,
    negativeRates,
    positiveRates,
  } = useSecretItem({ secretInfo });
  const {
    isViewContentModalOpen,
    setIsViewContentModalOpen,
    isStatsModalOpen,
    setIsStatsModalOpen,
    account,
  } = useSecretInfoAccessedItem();

  return (
    <motion.div
      whileInView={{
        opacity: [0, 100],
      }}
      className="flex flex-col items-start w-full gap-2 p-3 mt-4 border border-gray-600 rounded xl:p-6 lg:mg-6 xl:mt-10 text-text"
    >
      {isRepliesModalOpen ? (
        <SecretInfoRepliesModal
          setIsModalOpen={setIsRespliesModalOpen}
          replies={replies}
          secret_info_id={secret_info_id}
        />
      ) : null}

      {isViewContentModalOpen ? (
        <SecretInfoAccessedContentModal
          setIsModalOpen={setIsViewContentModalOpen}
          info={info}
          title={title}
        />
      ) : null}

      {isStatsModalOpen ? (
        <SecretInfoAccessedStatsModal
          setIsModalOpen={setIsStatsModalOpen}
          secretInfo={secretInfo}
        />
      ) : null}

      <div className="flex flex-col w-full gap-2 lg:flex-row">
        <div onClick={() => copy(owner_address)} className="w-full text-xs font-light duration-75 cursor-pointer lg:text-sm xl:text-base dont-break-out">{owner_address}</div>
        <div className="flex flex-row items-center justify-between w-full gap-4 lg:justify-end">
          <button
            onClick={() => setIsRespliesModalOpen(true)}
            className="px-2 py-1 text-sm duration-75 border cursor-pointer lg:text-base text-text rounded-button hover:border-text hover:text-primary-text"
          >
            Reply {`(${replies.length})`}
          </button>
          <div className='flex gap-2'>
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
      </div>

      <div>
        <div className="text-base font-medium lg:text-lg xl:text-xl">{title}</div>
        <div className='text-sm sm:text-base'>{description}</div>
        <div className="text-sm font-light sm:text-base">{parseDateFns(created_at)}</div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="px-2 py-1 text-sm border border-gray-500 md:text-base rounded-button">
          <span className="font-light">Left to buy </span>
          {Number(max_uses) - Number(current_uses)}
        </div>
        <div className="px-2 py-1 text-sm border border-gray-500 md:text-base rounded-button">
          <span className="font-light">Already bought </span>
          {Number(current_uses)}
        </div>
      </div>

      <div className="mt-2">
        {owner_address.toLocaleLowerCase() === account ? (
          'You created this info'
        ) : (
          <>
            Bought for
            <span className="ml-1 font-semibold">{convertEthGweiWei(amount)}</span>
          </>
        )}
      </div>
      <div>
        <button onClick={() => setIsViewContentModalOpen(true)} className="button">
          Info
        </button>
        {owner_address.toLocaleLowerCase() === account ? (
          <button onClick={() => setIsStatsModalOpen(true)} className="ml-4 button">
            Stats
          </button>
      ) : null}
      </div>
      
    </motion.div>
  );
};

export default SecretInfoAccessedItem;
