import { useSelector } from 'react-redux';
import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import { getAccount } from 'smart-contracts/slice';
import { SecretInfoItemProps } from './secret-info-item';
import { useState } from 'react';
import { convertEthGweiWei } from 'utils/helpers/convert';
import { getAccessedIds } from 'smart-contracts/passing-secret-info/slice';

const useSecretItem = ({
  secretInfo: [
    secret_info_id,
    owner_address,
    amount,
    title,
    description,
    zero_knowledge_proof,
    max_uses,
    current_uses,
    created_at,
    replies,
    rates,
  ],
}: SecretInfoItemProps) => {
  const account = useSelector(getAccount);
  const accessedIds = useSelector(getAccessedIds);
  const positiveRates = rates.filter(([id, owner_address, rate]) => rate === true).length;
  const negativeRates = rates.length - positiveRates;
  const currentRateArray = rates.filter(
    ([id, owner_address, rate]) => owner_address.toLocaleLowerCase() === account
  );
  const currentRate = currentRateArray.length > 0 ? currentRateArray[0] : null;
  const [isRepliesModalOpen, setIsRespliesModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  const like = async () => {
    if (currentRate && currentRate[2] === true) {
      await passingSecretInfoContract.removeSecretInfoRate(secret_info_id);
      return;
    }

    if (currentRate && currentRate[2] === false) {
      await passingSecretInfoContract.changeSecretInfoRate(secret_info_id);
      return;
    }

    await passingSecretInfoContract.addSecretInfoRate(secret_info_id, true);
  };

  const unlike = async () => {
    if (currentRate && currentRate[2] === false) {
      await passingSecretInfoContract.removeSecretInfoRate(secret_info_id);
      return;
    }

    if (currentRate && currentRate[2] === true) {
      await passingSecretInfoContract.changeSecretInfoRate(secret_info_id);
    }

    await passingSecretInfoContract.addSecretInfoRate(secret_info_id, false);
  };

  const getUserAccess = () => {
    if (owner_address.toLocaleLowerCase() === account) {
      return 'You are owner of this information';
    }

    if (accessedIds.some((id) => Number(id) === Number(secret_info_id))) {
      return 'You have access to this information';
    }

    if (Number(current_uses) >= Number(max_uses)) {
      return 'Supply has been used';
    }

    return `Buy for ${convertEthGweiWei(amount)}`;
  };

  return {
    accountAccess: getUserAccess(),
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
