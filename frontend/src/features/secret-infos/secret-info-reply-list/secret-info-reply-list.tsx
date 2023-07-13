import React, { FC } from 'react';
import { Reply } from 'smart-contracts/types';
import SecretInfoReplyItem from '../secret-info-reply-item/secret-info-reply-item';

export interface SecretInfoReplyListProps {
  replies: Reply[];
}

const SecretInfoReplyList: FC<SecretInfoReplyListProps> = ({ replies }) => {
  if (replies.length <= 0) {
    return <span className="text-black">There is no replies</span>;
  }

  return (
    <>
      {replies.map((reply) => (
        <SecretInfoReplyItem reply={reply} key={reply[0]} />
      ))}
    </>
  );
};

export default SecretInfoReplyList;
