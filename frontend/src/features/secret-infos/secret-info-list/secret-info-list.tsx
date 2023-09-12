import React, { FC } from 'react';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import SecretInfoItem from '../secret-info-item/secret-info-item';

export interface SecretInfoListProps {
  secretInfos: SecretInfo[];
  accessed: boolean;
}

const SecretInfoList: FC<SecretInfoListProps> = ({ secretInfos, accessed }) => {
  if (secretInfos.length <= 0) {
    <div className="mt-4">There is no secret infos here</div>;
  }

  return (
    <>
      {secretInfos.map((secretInfo) => (
        <SecretInfoItem key={Number(secretInfo[0])} accessed={accessed} secretInfo={secretInfo} />
      ))}
    </>
  );
};

export default SecretInfoList;
