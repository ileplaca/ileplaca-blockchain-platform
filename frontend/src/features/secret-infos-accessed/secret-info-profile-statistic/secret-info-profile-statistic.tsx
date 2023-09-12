import React, { FC } from 'react';

export interface SecretInfoProfileStatisticProps {
  name: string;
  value: string | number;
  change: string | number;
  variant: 'dark' | 'light';
}

const SecretInfoProfileStatistic: FC<SecretInfoProfileStatisticProps> = ({
  name,
  value,
  change = '',
  variant,
}) => {
  return (
    <div
      className={`flex flex-col gap-2 p-6 mt-4 border ${
        variant === 'dark' ? '' : 'border-black'
      } md:min-w-[24rem] rounded-button`}
    >
      <div
        className={`flex justify-between gap-10 ${
          variant === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        <div className="text-base">{name}</div>
        <div
          className={`text-sm ${
            Number(change) > 0 ? 'text-green-500' : Number(change) < 0 ? 'text-red-500' : ''
          }`}
        >
          {change !== '' ? change + '%' : null}
        </div>
      </div>
      <div className={`text-2xl font-medium ${variant === 'dark' ? '' : 'text-black'}`}>
        {value}
      </div>
    </div>
  );
};

export default SecretInfoProfileStatistic;
