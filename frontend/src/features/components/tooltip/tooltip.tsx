import React, { FC, useState } from 'react';

export interface TooltipProps {
  text: string;
}

const Tooltip: FC<TooltipProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-2 flex justify-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="transition-colors duration-200 focus:outline-none dark:hover:text-primary hover:text-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </button>

      {isOpen ? (
        <p className="absolute flex items-center justify-center p-3  text-gray-600 -translate-x-1/2 bg-white rounded-lg shadow-lg -top-16 left-1/2 dark:shadow-none shadow-gray-200 dark:bg-gray-800 dark:text-white">
          <span className="truncate text-xs">{text}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 absolute rotate-45 -translate-x-1/2 left-1/2 bottom-0.5 -mb-3 transform text-white dark:text-gray-800 fill-current"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
          </svg>
        </p>
      ) : null}
    </div>
  );
};

export default Tooltip;
