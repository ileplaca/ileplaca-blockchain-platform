import React, { FC } from 'react';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import SecretInfoItem from '../secret-info-item/secret-info-item';

export interface SecretInfoListProps {
  secretInfos: SecretInfo[];
}

const SecretInfoList: FC<SecretInfoListProps> = ({ secretInfos }) => {
  if (secretInfos.length <= 0) {
    <div className="mt-4">There is no secret infos here</div>;
  }

  return (
    <>
      {secretInfos.map((secretInfo) => (
        <SecretInfoItem key={Number(secretInfo[0])} secretInfo={secretInfo} />
      ))}
    </>
  );
};

export default SecretInfoList;
