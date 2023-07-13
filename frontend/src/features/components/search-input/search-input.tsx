import React, { FC } from 'react';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import useSearchInput from './use-search-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export interface SearchInputProps {
  setEntities: React.Dispatch<React.SetStateAction<SecretInfo[]>>;
}

const SearchInput: FC<SearchInputProps> = ({ setEntities }) => {
  const { result, setValue, setEntitiesById, search } = useSearchInput({ setEntities });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search('result');
        }}
      >
        <input
          onChange={(e) => setValue(e.target.value.toLocaleLowerCase())}
          type="text"
          className="px-4 py-3 text-white duration-75 border border-gray-600 outline-none focus:bg-primary-bg placeholder:text-gray-300 bg-bg rounded-button "
          placeholder="Search salary"
        />
        <button
          onClick={() => search('result')}
          className="px-4 py-3 ml-2 duration-75 border border-gray-600 rounded-button hover:bg-primary-bg"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      <div className="absolute flex flex-col mt-1">
        {result.map(([secret_info_id, owner_address, amount, title]) => (
          <button
            onClick={() => setEntitiesById(secret_info_id)}
            key={secret_info_id}
            className="w-full px-2 py-1 text-xs duration-75 border border-gray-600 bg-zinc-800 hover:bg-zinc-900 text-subtext rounded-button"
          >
            {title.substring(0, 40)}
            {title.length > 40 ? '...' : ''}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchInput;