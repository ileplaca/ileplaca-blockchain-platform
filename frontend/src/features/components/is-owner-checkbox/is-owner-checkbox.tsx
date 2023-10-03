import React, { FC } from 'react';
import useIsOwnerCheckbox from './use-is-owner-checkbox';
import { SmartContractsDataTypes } from 'smart-contracts/types';

export interface IsOwnerCheckboxProps {
  type: SmartContractsDataTypes;
}

const IsOwnerCheckbox: FC<IsOwnerCheckboxProps> = ({ type }) => {
  const { handleOnChange } = useIsOwnerCheckbox({ type });

  return (
    <div className="flex items-center p-3 text-sm border border-gray-600 sm:text-base rounded-button">
      <input
        onChange={(e) => handleOnChange(e.target.checked)}
        defaultChecked
        id="bordered-checkbox-1"
        type="checkbox"
        value={'true'}
        name="bordered-checkbox"
        className="text-blue-600 bg-gray-100 border-gray-300 rounded sm:w-4 sm:h-4 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="bordered-checkbox-1"
        className="w-full ml-1 font-medium text-gray-900 dark:text-gray-300"
      >
        Owner's
      </label>
    </div>
  );
};

export default IsOwnerCheckbox;
