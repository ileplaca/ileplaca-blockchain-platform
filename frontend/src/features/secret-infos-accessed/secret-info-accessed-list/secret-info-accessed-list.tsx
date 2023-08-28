import React, { FC } from 'react';
import {
  SecretInfoAccessed,
  SecretInfoAccessedResponse,
} from 'smart-contracts/passing-secret-info/types';
import SecretInfoAccessedItem from '../secret-info-accessed-item/secret-info-accessed-item';

export interface SecretInfoAccessedListProps {
  secretInfosAccessedResponse: SecretInfoAccessedResponse[];
}

const SecretInfoAccessedList: FC<SecretInfoAccessedListProps> = ({
  secretInfosAccessedResponse,
}) => {
  if (secretInfosAccessedResponse.length <= 0) {
    return <div className="mt-4">You don't have any secret infos accessed</div>;
  }

  return (
    <>
      {secretInfosAccessedResponse.map(([secretInfo, secretInfoAccessed]) => (
        <SecretInfoAccessedItem
          key={secretInfo[0]}
          secretInfo={secretInfo}
          secretInfoAccessed={secretInfoAccessed}
        />
      ))}
    </>
  );
};

export default SecretInfoAccessedList;
