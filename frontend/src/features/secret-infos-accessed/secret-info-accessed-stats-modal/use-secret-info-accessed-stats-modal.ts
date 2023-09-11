import { SecretInfoAccessedStatsModalProps } from './secret-info-accessed-stats-modal';

const useSecretInfoAccessedStatsModal = ({
  secretInfo,
  setIsModalOpen,
}: SecretInfoAccessedStatsModalProps) => {
  const [
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
    rates
  ] = secretInfo;

  const calcRate = () => {
    if (rates.length === 0) {
      return 'There is no rates';
    }

    let rateCounter = 0;

    rates.forEach((rate) => {
      if (rate) {
        rateCounter++;
      }
    });

    return `${(rateCounter / rates.length) * 100}%`;
  };

  return {
    calcRate,
  };
};

export default useSecretInfoAccessedStatsModal;
