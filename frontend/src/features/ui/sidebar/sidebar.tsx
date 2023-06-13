import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { sidebarRoutes } from 'utils/data/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sidebar: FC = () => {
  return (
    <aside className='fixed w-1/4 h-screen p-10 border-r border-gray-600 bg-bg'>
      <h1 className='flex items-end text-3xl font-black'>
        ileplaca
        <div className='-mb-1 text-xs font-thin'>blockchain</div>
      </h1>
      <nav className='flex flex-col mt-6'>
        {
          sidebarRoutes.map(route => (
            <Link key={route.name} to={route.route} className='px-4 py-2 mt-2 font-medium duration-75 hover:bg-primary-bg text-subtext rounded-button hover:text-text'>
              <FontAwesomeIcon icon={route.icon} className={`w-4 mr-2 ${window.location.href.includes(route.route) ? "text-secondary" : ""}`} />
              {route.name}
            </Link>
          ))
        }
      </nav>
    </aside>
  )
}

export default Sidebar;