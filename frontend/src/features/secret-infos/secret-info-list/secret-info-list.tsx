import React, { FC } from 'react';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import SecretInfoItem from '../secret-info-item/secret-info-item';

export interface SecretInfoListProps {
  secretInfos: SecretInfo[];
}

const SecretInfoList: FC<SecretInfoListProps> = ({ secretInfos }) => {
  return (
    <>
      {secretInfos.map((secretInfo) => (
        <SecretInfoItem key={Number(secretInfo[0])} secretInfo={secretInfo} />
      ))}
    </>
  );
};

export default SecretInfoList;
