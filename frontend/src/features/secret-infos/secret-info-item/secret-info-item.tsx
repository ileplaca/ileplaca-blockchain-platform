import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import { parseDateFns } from 'utils/constans/date-fns';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { convertEthGweiWei } from 'utils/helpers/convert';
import useSecretItem from './use-secret-item';
import { SecretInfoPayModal } from 'features/secret-infos';
import { motion } from 'framer-motion';
import SecretInfoRepliesModal from '../secret-info-replies-modal/secret-info-replies-modal';
import { copy } from 'utils/helpers/copy';
import useSecretInfoAccessedItem from './use-secret-info-accessed-item';
import {
  SecretInfoAccessedContentModal,
  SecretInfoAccessedStatsModal,
} from 'features/secret-infos-accessed';
import { Link, useNavigate } from 'react-router-dom';
import Tooltip from 'features/components/tooltip/tooltip';
import { zeroKnowledgeProofText } from 'features/components/tooltip/tooltip.texts';
import { handleCopyAddress } from 'utils/helpers/alert';
import { ROTUES } from 'utils/types/routes';
import { getSecretInfosStatus } from 'smart-contracts/passing-secret-info/slice';
import { useSelector } from 'react-redux';
import { ResponseStatus } from 'utils/types/api';
import {
  ComponentInfoBox,
  ErrorMessage,
  Loading,
  OwnerAddressSection,
  ReplyAndRateSection,
} from 'features/components';

export interface SecretInfoItemProps {
  secretInfo: SecretInfo;
  accessed: boolean;
}

const SecretInfoItem: FC<SecretInfoItemProps> = ({ secretInfo, accessed }) => {
  const navigate = useNavigate();
  const [
    secret_info_id,
    owner_address,
    amount,
    title,
    description,
    zero_knowledge_proof,
    max_uses,
    current_uses,
    created_at,
    replies,
    rates,
  ] = secretInfo;
  const {
    accountAccess,
    positiveRates,
    negativeRates,
    currentRate,
    like,
    unlike,
    isRepliesModalOpen,
    setIsRepliesModalOpen,
    isPayModalOpen,
    setIsPayModalOpen,
  } = useSecretItem({ secretInfo, accessed });

  const {
    isViewContentModalOpen,
    setIsViewContentModalOpen,
    isStatsModalOpen,
    setIsStatsModalOpen,
    account,
  } = useSecretInfoAccessedItem();

  const status = useSelector(getSecretInfosStatus);

  if (status === ResponseStatus.FAILED) return <ErrorMessage />;
  if (status === ResponseStatus.PENDING) return <Loading />;

  return (
    <motion.div
      whileInView={{
        opacity: [0, 100],
      }}
      className="flex flex-col items-start w-full gap-2 p-3 mt-4 border border-gray-600 rounded xl:p-6 lg:mg-6 xl:mt-10 text-text"
    >
      <div className="flex flex-col w-full gap-2 lg:flex-row">
        <OwnerAddressSection owner_address={owner_address} />
        <ReplyAndRateSection
          like={like}
          unlike={unlike}
          currentRate={currentRate}
          negativeRates={negativeRates}
          positiveRates={positiveRates}
          replySection={{
            repliesLength: replies.length,
            setIsRepliesModalOpen,
          }}
        />
      </div>

      <div>
        <div className="text-base font-semibold lg:text-lg xl:text-xl">{title}</div>
        <div className="text-sm sm:text-base">{description}</div>
        <div className="flex items-center mt-2 ">
          <div className="text-base font-medium lg:text-lg">Zero knowledge proof</div>
          <Tooltip text={zeroKnowledgeProofText} />
        </div>
        <div className="text-sm sm:text-base">{zero_knowledge_proof}</div>
        <div className="text-sm font-light sm:text-base">{parseDateFns(created_at)}</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ComponentInfoBox name="Left to buy" value={Number(max_uses) - Number(current_uses)} />
        <ComponentInfoBox name="Already bought" value={Number(current_uses)} />
      </div>

      {!accessed ? (
        <motion.button
          whileHover={{
            transition: {
              duration: 0.05,
            },
            rotate: [0, 5, 0],
          }}
          className={`
            text-sm px-4 py-2 sm:text-base sm:px-6 font-medium duration-75 rounded-button
            ${
              accountAccess.includes('Buy for')
                ? 'hover:bg-primary-hover bg-primary'
                : ' cursor-not-allowed bg-primary-hover'
            }
          `}
          onClick={() => (accountAccess.includes('Buy for') ? setIsPayModalOpen(true) : () => {})}
        >
          {accountAccess}
        </motion.button>
      ) : (
        <>
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
        </>
      )}

      {isRepliesModalOpen && (
        <SecretInfoRepliesModal
          setIsModalOpen={setIsRepliesModalOpen}
          replies={replies}
          secret_info_id={secret_info_id}
        />
      )}

      {isPayModalOpen && (
        <SecretInfoPayModal
          setIsModalOpen={setIsPayModalOpen}
          amount={convertEthGweiWei(amount)}
          action={async () => {
            await passingSecretInfoContract.payForSecretInfoAccess(secret_info_id, {
              value: amount,
            });
            navigate('/secret-info-accessd');
          }}
        />
      )}

      {isViewContentModalOpen && (
        <SecretInfoAccessedContentModal
          setIsModalOpen={setIsViewContentModalOpen}
          secret_info_id={secret_info_id}
          title={title}
        />
      )}

      {isStatsModalOpen && (
        <SecretInfoAccessedStatsModal
          setIsModalOpen={setIsStatsModalOpen}
          secretInfo={secretInfo}
        />
      )}
    </motion.div>
  );
};

export default SecretInfoItem;
