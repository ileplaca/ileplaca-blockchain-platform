import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getSecretInfosError } from 'smart-contracts/passing-secret-info/slice';

const ErrorMessage: FC = () => {
  const error = useSelector(getSecretInfosError);
  return (
    <div className='text-lg font-medium'>{error}</div>
  )
}

export default ErrorMessage;