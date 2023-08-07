import React, { FC } from 'react';
import { PassingSecretInfoTypes } from 'smart-contracts/passing-secret-info/types';
import useIsOwnerCheckbox from './use-is-owner-checkbox';

export interface IsOwnerCheckboxProps {
  type: PassingSecretInfoTypes;
}

const IsOwnerCheckbox: FC<IsOwnerCheckboxProps> = ({ type }) => {
  const { handleOnChange } = useIsOwnerCheckbox({ type });

  return (
    <div className="flex items-center p-3 border border-gray-600 rounded-button">
      <input
        onChange={(e) => handleOnChange(e.target.checked)}
        defaultChecked
        id="bordered-checkbox-1"
        type="checkbox"
        value={'true'}
        name="bordered-checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="bordered-checkbox-1"
        className="w-full ml-2 font-medium text-gray-900 dark:text-gray-300"
      >
        Owner's
      </label>
    </div>
  );
};

export default IsOwnerCheckbox;
