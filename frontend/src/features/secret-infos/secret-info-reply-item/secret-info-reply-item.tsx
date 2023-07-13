import React, { FC } from 'react';
import { Reply } from 'smart-contracts/types';

export interface SecretInfoReplyItemProps {
  reply: Reply;
}

const SecretInfoReplyItem: FC<SecretInfoReplyItemProps> = ({
  reply: [id, owner_address, created_at, content],
}) => {
  return (
    <div className="mt-2 text-black">
      <div className="text-xs">{owner_address}</div>
      <div className="text-lg">{content}</div>
    </div>
  );
};

export default SecretInfoReplyItem;
