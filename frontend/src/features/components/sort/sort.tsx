import React, { FC, useState } from 'react';
import useSort from './use-sort';
import { PassingSecretInfoTypes } from 'smart-contracts/passing-secret-info/types';
import { sortTypes } from './sort.types';

export interface SortProps {
  type: PassingSecretInfoTypes;
}

const Sort: FC<SortProps> = ({ type }) => {
  const { handleOnChange } = useSort({ type });

  return (
    <select
      onChange={(event) => handleOnChange(event)}
      className="px-3 py-2 text-sm text-white border border-gray-600 outline-none sm:text-base sm:py-3 sm:px-4 placeholder:text-gray-300 bg-bg rounded-button"
    >
      {sortTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default Sort;
