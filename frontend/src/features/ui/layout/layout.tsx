import React, { FC, ReactNode } from 'react';
import Sidebar from '../sidebar/sidebar';
import { FCC } from 'utils/types';

export interface LayoutProps {
  children?: ReactNode
}

const Layout: FCC<LayoutProps> = ({ children }) => {
  return (
    <main className='flex flex-row'>
      <Sidebar />
      <section className='absolute flex flex-col w-3/4 px-12 mt-10 left-1/4'>
        {children}
      </section>
    </main>
  )
}

export default Layout;