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
  return (
    <>
      {secretInfosAccessedResponse.map(([secretInfo, secretInfoAccessed]) => (
        <SecretInfoAccessedItem secretInfo={secretInfo} secretInfoAccessed={secretInfoAccessed} />
      ))}
    </>
  );
};

export default SecretInfoAccessedList;
