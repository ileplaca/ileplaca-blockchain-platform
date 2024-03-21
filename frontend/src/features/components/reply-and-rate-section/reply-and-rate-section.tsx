import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Rate } from 'smart-contracts/types';

export interface ReplyAndRateSectionProps {
  like: () => void;
  unlike: () => void;
  currentRate: Rate | null;
  positiveRates: number;
  negativeRates: number;
  replySection?: {
    repliesLength: number;
    setIsRepliesModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const ReplyAndRateSection: FC<ReplyAndRateSectionProps> = ({
  like,
  unlike,
  currentRate,
  positiveRates,
  negativeRates,
  replySection,
}) => {
  return (
    <div className="flex flex-row items-center justify-between w-full gap-4 lg:justify-end">
      {replySection && (
        <>
          <button
            onClick={() => replySection.setIsRepliesModalOpen(true)}
            className="px-2 py-1 text-sm duration-75 border cursor-pointer lg:text-base text-text rounded-button hover:border-text hover:text-primary-text"
          >
            Reply {`(${replySection.repliesLength})`}
          </button>
        </>
      )}

      <div className="flex gap-2">
        <motion.button
          whileHover={{
            rotate: [0, 20, 0],
            transition: {
              duration: 0.125,
            },
          }}
          onClick={like}
          className={`hover:text-green-400 duration-75 ${currentRate?.[2] ? 'text-green-500' : ''}`}
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
  );
};

export default ReplyAndRateSection;
