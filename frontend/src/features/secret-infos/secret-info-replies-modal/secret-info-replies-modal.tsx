import React, { FC } from 'react';

import { motion } from 'framer-motion'
import { Reply } from 'smart-contracts/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import SecretInfoReplyList from '../secret-info-reply-list/secret-info-reply-list';

export interface SecretInfoModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  replies: Reply[]
  secret_info_id: number
}

const SecretInfoRepliesModal: FC<SecretInfoModalProps> = ({ setIsModalOpen, replies, secret_info_id }) => {
  return (
    <motion.div
      animate={{ y: [200, 0] }}
      className="flex flex-col w-5/12 gap-4 px-8 py-8 overflow-scroll h-1/2 bg-text rounded-button"
    >
      <div className='flex flex-row items-center justify-between'>
        <h1 className='text-3xl text-black'>
          Replies
        </h1>
        <button onClick={() => setIsModalOpen(false)} className='px-4 py-2 text-lg text-black duration-75 border border-gray-600 rounded-button hover:bg-primary-text'>
          <FontAwesomeIcon icon={faClose} />
        </button>
        {/* <button className='text-black' onClick={() => passingSecretInfoContract.addSecretInfoReply(secret_info_id, "Reply to this info")}>
          add reply
        </button> */}
      </div>
      <SecretInfoReplyList replies={replies} />
    </motion.div>
  )
}

export default SecretInfoRepliesModal;