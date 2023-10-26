import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAccount } from 'smart-contracts/slice';

const useSecretInfoAccessedItem = () => {
  const account = useSelector(getAccount);
  const [isViewContentModalOpen, setIsViewContentModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  return {
    isViewContentModalOpen,
    setIsViewContentModalOpen,
    isStatsModalOpen,
    setIsStatsModalOpen,
    account,
  };
};

export default useSecretInfoAccessedItem;
