import { CloseModal, ModalLayout } from 'features/ui';
import React, { FC } from 'react';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import SecretInfoProfileStatistic from '../secret-info-profile-statistic';
import { convertEthGweiWei } from 'utils/helpers/convert';
import useSecretInfoAccessedStatsModal from './use-secret-info-accessed-stats-modal';

export interface SecretInfoAccessedStatsModalProps {
  secretInfo: SecretInfo;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SecretInfoAccessedStatsModal: FC<SecretInfoAccessedStatsModalProps> = ({
  secretInfo,
  setIsModalOpen,
}) => {
  const [
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
  ] = secretInfo;

  const { calcRate } = useSecretInfoAccessedStatsModal({ secretInfo, setIsModalOpen });

  return (
    <ModalLayout>
      <div className="flex flex-row items-center justify-between text-black">
        <h1 className="text-3xl font-medium text-black">Stats</h1>
        <CloseModal setIsModalOpen={setIsModalOpen} />
      </div>

      <div className="flex flex-wrap w-full gap-4 ">
        <SecretInfoProfileStatistic
          variant="light"
          name="Bought"
          value={Number(current_uses)}
          change=""
        />
        <SecretInfoProfileStatistic
          variant="light"
          name="Earnings"
          value={convertEthGweiWei(Number(current_uses) * Number(amount))}
          change=""
        />
        <SecretInfoProfileStatistic
          variant="light"
          name="Sold"
          value={Number(current_uses)}
          change=""
        />
        <SecretInfoProfileStatistic
          variant="light"
          name="Average rate"
          value={calcRate()}
          change=""
        />
      </div>
    </ModalLayout>
  );
};

export default SecretInfoAccessedStatsModal;
