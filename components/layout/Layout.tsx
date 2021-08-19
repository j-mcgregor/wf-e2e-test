import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Nav from './Nav';
import Seo from './Seo';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  pageTitle?: string;
  description?: string;
  noMenu?: boolean | undefined;
  noNav?: boolean | undefined;
};

const Layout = ({
  children,
  noNav,
  title,
  description,
  pageTitle
}: LayoutProps) => {
  const router = useRouter();
  const path: string = router.pathname;

  return (
    <div>
      <Seo title={title} description={description} path={path} />
      <div className="h-screen bg-bg overflow-hidden flex ">
        {!noNav && <Nav path={path} />}
        <main className="flex-1 relative overflow-y-auto focus:outline-none pt-12">
          <div className="py-6">
            <div className="px-4 sm:px-6 md:px-0">
              {pageTitle && (
                <h1 className="text-2xl font-semibold text-gray-900">
                  {pageTitle}
                </h1>
              )}
            </div>
            <div className="px-4 sm:px-6 max-w-5xl mx-auto">
                {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
