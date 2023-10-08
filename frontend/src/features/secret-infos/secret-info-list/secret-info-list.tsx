import React, { FC } from 'react';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import SecretInfoItem from '../secret-info-item/secret-info-item';
import { ErrorMessage, Loading } from 'features/components';
import { ResponseStatus } from 'utils/types/api';
import { useSelector } from 'react-redux';
import { getSecretInfosStatus } from 'smart-contracts/passing-secret-info/slice';

export interface SecretInfoListProps {
  secretInfos: SecretInfo[];
  accessed: boolean;
}

const SecretInfoList: FC<SecretInfoListProps> = ({ secretInfos, accessed }) => {
  const status = useSelector(getSecretInfosStatus);

  if (status === ResponseStatus.FAILED) return <ErrorMessage />;
  if (status === ResponseStatus.PENDING) return <Loading />;
  if (secretInfos.length === 0) {
    return <div className="mt-4">There is no secret infos here</div>;
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
