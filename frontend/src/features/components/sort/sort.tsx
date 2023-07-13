import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSecretInfos } from 'smart-contracts/passing-secret-info/slice';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import useSort, { sortTypes } from './use-sort';

export interface SortProps {
  setEntities: React.Dispatch<React.SetStateAction<SecretInfo[]>>;
}

const Sort: FC<SortProps> = ({ setEntities }) => {
  const { handleOnChange } = useSort({ setEntities });

  return (
    <select
      onChange={(event) => handleOnChange(event)}
      className="px-4 py-3 text-white border border-gray-600 outline-none placeholder:text-gray-300 bg-bg rounded-button"
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
