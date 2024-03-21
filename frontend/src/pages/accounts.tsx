import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROTUES } from 'utils/types/routes';

const Accounts: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className='text-3xl'>Search someone by address</h1>
      <form
        className='mt-4'
        onSubmit={(e: any) => {
          e.preventDefault();
          navigate(e.target[0].value)
        }}
      >
        <input
          type="text"
          className="px-2 py-1 text-sm text-white duration-75 border border-gray-600 outline-none sm:text-base sm:px-4 sm:py-3 focus:bg-primary-bg placeholder:text-gray-300 bg-bg rounded-button "
          placeholder="Search salary"
        />
        <button
          className="px-2 py-1 ml-2 text-sm duration-75 border border-gray-600 sm:text-base sm:py-3 sm:px-4 rounded-button hover:bg-primary-bg"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </>
  )
}

export default Accounts;