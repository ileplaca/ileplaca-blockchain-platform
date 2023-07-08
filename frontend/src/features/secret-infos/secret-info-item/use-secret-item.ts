import { useSelector } from 'react-redux';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import { getAccount } from 'smart-contracts/slice';
import { SecretInfoItemProps } from './secret-info-item';
import { useEffect, useState } from 'react';
import { Rate } from 'smart-contracts/types';

const useSecretItem = ({
  secretInfo: [
    secret_info_id,
    owner_address,
    amount,
    title,
    description,
    created_at,
    max_uses,
    current_uses,
    replies,
    rates,
  ],
}: SecretInfoItemProps) => {
  const account = useSelector(getAccount);
  const positiveRates = rates.filter(([id, owner_address, rate]) => rate === true).length;
  const negativeRates = rates.length - positiveRates;
  const currentRateArray = rates.filter(
    ([id, owner_address, rate]) => owner_address.toLocaleLowerCase() === account.toLocaleLowerCase()
  );
  const currentRate = currentRateArray.length > 0 ? currentRateArray[0] : null;
  const [isRepliesModalOpen, setIsRespliesModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  const like = async () => {
    if (currentRate && currentRate[2]) {
      await passingSecretInfoContract.removeSecretInfoRate(secret_info_id);
      return;
    }

    if (currentRate && !currentRate[2]) {
      await passingSecretInfoContract.changeSecretInfoRate(secret_info_id);
      return;
    }

    await passingSecretInfoContract.addSecretInfoRate(secret_info_id, true);
  };

  const unlike = async () => {
    if (currentRate && !currentRate[2]) {
      await passingSecretInfoContract.removeSecretInfoRate(secret_info_id);
      return;
    }

    if (currentRate && currentRate[2]) {
      await passingSecretInfoContract.changeSecretInfoRate(secret_info_id);
    }

    await passingSecretInfoContract.addSecretInfoRate(secret_info_id, false);
  };

  return {
    positiveRates,
    negativeRates,
    currentRate,
    like,
    unlike,
    isRepliesModalOpen,
    setIsRespliesModalOpen,
    isPayModalOpen,
    setIsPayModalOpen,
  };
};

export default useSecretItem;
