import React, { FC } from 'react';

export interface ComponentInfoBoxProps {
  name: string;
  value: string | number;
}

const ComponentInfoBox: FC<ComponentInfoBoxProps> = ({ name, value }) => {
  return (
    <div className="px-2 py-1 border border-gray-500 rounded-button">
      <span className="font-light">{name} </span>
      {value}
    </div>
  );
};

export default ComponentInfoBox;
