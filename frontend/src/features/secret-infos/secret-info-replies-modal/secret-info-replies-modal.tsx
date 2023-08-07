import React, { FC } from 'react';

import { motion } from 'framer-motion';
import { Reply } from 'smart-contracts/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import SecretInfoReplyList from '../secret-info-reply-list/secret-info-reply-list';
import { CloseModal, ModalLayout } from 'features/ui';

export interface SecretInfoModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  replies: Reply[];
  secret_info_id: number;
}

const SecretInfoRepliesModal: FC<SecretInfoModalProps> = ({
  setIsModalOpen,
  replies,
  secret_info_id,
}) => {
  return (
    <ModalLayout>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl text-black">Replies</h1>
        <CloseModal setIsModalOpen={setIsModalOpen} />
        {/* <button className='text-black' onClick={() => passingSecretInfoContract.addSecretInfoReply(secret_info_id, "Reply to this info")}>
          add reply
        </button> */}
      </div>
      <SecretInfoReplyList replies={replies} />
    </ModalLayout>
  );
};

export default SecretInfoRepliesModal;
