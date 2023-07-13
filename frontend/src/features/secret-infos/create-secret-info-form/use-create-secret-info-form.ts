import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import { CreateSecretInfoDto } from './create-secret-info-form.config';
import { parseEthGweiToWei } from 'utils/helpers/convert';
import { useState } from 'react';

const useCreateSecretInfoForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleOnChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    if (value.startsWith('0')) {
      e.target.value = value.split('').splice(-1, 1).join('');
    }
    if (value === '') {
      e.target.value = '0';
    }
  };

  const onSubmit = async (data: CreateSecretInfoDto) => {
    setLoading(true);
    const parsedAmount = parseEthGweiToWei(data.amount, data.amount_unit);

    try {
      await passingSecretInfoContract.addSecretInfo(
        BigInt(parsedAmount),
        data.title,
        data.description,
        data.max_uses,
        data.secret_info
      );
    } catch (err) {
      const error = err as any;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleOnChangeAmount,
    onSubmit,
    error,
    loading,
  };
};

export default useCreateSecretInfoForm;
