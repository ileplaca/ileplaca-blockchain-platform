import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import { FCC } from 'utils/types';

export interface WarningTextProps {
  children: ReactNode;
}

const WarningText: FCC<WarningTextProps> = ({ children }: WarningTextProps) => {
  return (
    <div className="flex gap-2 mt-2">
      <FontAwesomeIcon icon={faExclamationCircle} className="text-lg text-yellow-600" />
      <span className="text-sm text-black">{children}</span>
    </div>
  );
};

export default WarningText;
