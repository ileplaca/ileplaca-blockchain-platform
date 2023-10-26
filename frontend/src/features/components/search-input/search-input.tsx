import React, { FC } from 'react';
import useSearchInput from './use-search-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SEARCH_TYPE } from './search-inputs.types';
import { SMART_CONTRACTS_DATA_ENUM, SmartContractsDataTypes } from 'smart-contracts/types';
import { SecretInfo } from 'smart-contracts/passing-secret-info/types';
import { Salary } from 'smart-contracts/companies-salaries/types';

export interface SearchInputProps {
  type: SmartContractsDataTypes;
}

const SearchInput: FC<SearchInputProps> = ({ type }) => {
  const { result, setValue, setEntitiesById, search } = useSearchInput({ type });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(SEARCH_TYPE.RESULT);
        }}
      >
        <input
          onChange={(e) => setValue(e.target.value.toLocaleLowerCase())}
          type="text"
          className="px-2 py-1 text-sm text-white duration-75 border border-gray-600 outline-none sm:text-base sm:px-4 sm:py-3 focus:bg-primary-bg placeholder:text-gray-300 bg-bg rounded-button "
          placeholder="Search salary"
        />
        <button
          onClick={() => search(SEARCH_TYPE.RESULT)}
          className="px-2 py-1 ml-2 text-sm duration-75 border border-gray-600 sm:text-base sm:py-3 sm:px-4 rounded-button hover:bg-primary-bg"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      {type === SMART_CONTRACTS_DATA_ENUM.SECRET_INFO && (
        <div className="absolute flex flex-col mt-1">
          {(result as SecretInfo[]).map(([secret_info_id, owner_address, amount, title]) => (
            <button
              onClick={() => setEntitiesById(secret_info_id)}
              key={secret_info_id}
              className="w-full px-2 py-1 text-sm duration-75 border border-gray-600 bg-zinc-800 hover:bg-zinc-900 text-subtext rounded-button"
            >
              {title.substring(0, 40)}
              {title.length > 40 ? '...' : ''}
            </button>
          ))}
        </div>
      )}

      {type === SMART_CONTRACTS_DATA_ENUM.COMPANIES_SALARY && (
        <div className="absolute flex flex-col mt-1">
          {(result as Salary[]).map(
            ([
              salary_id,
              owner_address,
              first,
              last,
              speed_of_growth,
              company_id,
              company_name,
              role,
              experience,
              opinion,
              location,
              employment_type,
              operating_mode,
              salary_currency,
              experience_in_company,
              created_at,
              replies,
              rates,
            ]) => (
              <button
                onClick={() => setEntitiesById(salary_id)}
                key={Number(salary_id)}
                className="w-full px-2 py-1 text-sm duration-75 border border-gray-600 bg-zinc-800 hover:bg-zinc-900 text-subtext rounded-button"
              >
                {company_name.substring(0, 40)}
                {company_name.length > 40 ? '...' : ''}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
