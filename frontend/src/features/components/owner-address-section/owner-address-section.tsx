import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { handleCopyAddress } from 'utils/helpers/alert';
import { ROTUES } from 'utils/types/routes';

export interface OwnerAddressSectionProps {
  owner_address: string;
}

const OwnerAddressSection: FC<OwnerAddressSectionProps> = ({ owner_address }) => {
  return (
    <div className="w-full text-xs font-light duration-75 cursor-pointer lg:text-sm xl:text-base">
      <button
        className="dont-break-out hover:bg-gray-800 rounded-button"
        onClick={() => handleCopyAddress(owner_address)}
      >
        {owner_address}
      </button>
      <div className="underline">
        <Link to={`/${ROTUES.accounts}/${owner_address}`}>Checkout</Link>
      </div>
    </div>
  )
}

export default OwnerAddressSection;