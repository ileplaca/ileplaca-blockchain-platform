import { passingSecretInfoContract } from 'smart-contracts/passing-secret-info/actions';
import { CreateSecretInfoDto } from './create-secret-info-form.config';
import { parseEthGweiToWei } from 'utils/helpers/convert';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createSecretInfoFormValidationSchema,
  seYupValidationResolver,
} from './create-secret-info-form.config';
import { UnitEnum } from 'utils/types/units';
import { useNavigate } from 'react-router-dom';
import { successAlert } from 'utils/helpers/alert';

const useCreateSecretInfoForm = () => {
  const resolver = seYupValidationResolver(createSecretInfoFormValidationSchema);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver });
  const navigate = useNavigate();

  const [error, setError] = useState('');
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
        data.zero_knowledge_proof,
        data.max_uses,
        data.info
      );
      successAlert({
        title: 'First step success!',
        text: 'Waiting for confirmation...',
      });
      navigate('/secret-info-accessed');
    } catch (err) {
      setError('Something went wrong');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleOnChangeAmount,
    onSubmit,
    error,
    loading,
    register,
    handleSubmit,
    errors,
  };
};

export default useCreateSecretInfoForm;
