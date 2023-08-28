import React, { FC, ReactNode } from 'react';
import Sidebar from '../sidebar/sidebar';
import { FCC } from 'utils/types';

export interface LayoutProps {
  children?: ReactNode;
}

const Layout: FCC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <section className="absolute flex flex-col w-9/12 px-2 mt-4 lg:mt-6 xl:mt-10 left-20 sm:left-28 xl:w-3/4 md:px-4 lg:px-8 xl:px-12 xl:left-1/4">{children}</section>
    </main>
  );
};

export default Layout;
