import React, { FC } from 'react';
import {
  SecretInfo,
  SecretInfoAccessed,
  SecretInfoAccessedResponse,
} from 'smart-contracts/passing-secret-info/types';

export interface SecretInfoAccessedItemProps {
  secretInfo: SecretInfo;
  secretInfoAccessed: SecretInfoAccessed;
}

const SecretInfoAccessedItem: FC<SecretInfoAccessedItemProps> = ({ secretInfoAccessed }) => {
  return <div>secret info accessed</div>;
};

export default SecretInfoAccessedItem;
