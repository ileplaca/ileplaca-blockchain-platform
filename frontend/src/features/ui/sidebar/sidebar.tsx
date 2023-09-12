import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { sidebarRoutes } from 'utils/data/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar: FC = () => {
  return (
    <aside className="fixed p-2 border-r h-full border-gray-600 xl:w-1/4 xl:p-10 bg-bg">
      <h1 className="flex flex-col items-end text-base font-black sm:flex-row xl:text-3xl">
        ileplaca
        <div className="text-xs font-thin sm:-mb-3 sm:-ml-8 xl:-mb-1 xl:-ml-0">blockchain</div>
      </h1>
      <nav className="flex flex-col mt-6 text-center xl:text-left">
        {sidebarRoutes.map((route) => (
          <Link
            key={route.name}
            to={route.route}
            className="px-4 py-2 mt-2 font-medium duration-75 hover:bg-primary-bg text-subtext rounded-button hover:text-text"
          >
            <FontAwesomeIcon
              icon={route.icon}
              className={`w-4 text-lg mr-2 ${
                window.location.href.includes(route.route) ? 'text-secondary' : ''
              }`}
            />
            <span className="hidden xl:inline-block">
              {route.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
