import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createCompaniesSalaryFormValidationSchema,
  seYupValidationResolver,
} from './create-companies-salary-form.config';
import { useNavigate } from 'react-router-dom';
import { successAlert } from 'utils/helpers/alert';
import { SalaryDto } from 'smart-contracts/companies-salaries/types';
import { companiesSalariesContract } from 'smart-contracts/companies-salaries/actions';

const useCreateSecretInfoForm = () => {
  const resolver = seYupValidationResolver(createCompaniesSalaryFormValidationSchema);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver });
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data: SalaryDto) => {
    setLoading(true);

    try {
      data.experience = BigInt(data.experience);
      data.experience_in_company = BigInt(data.experience_in_company);
      data.first = BigInt(data.first);
      data.last = BigInt(data.last);
      data.speed_of_growth = BigInt(data.speed_of_growth)
      data.company_id = BigInt(0)

      await companiesSalariesContract.addSalary(data)

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
    onSubmit,
    error,
    loading,
    register,
    handleSubmit,
    errors,
  };
};

export default useCreateSecretInfoForm;
