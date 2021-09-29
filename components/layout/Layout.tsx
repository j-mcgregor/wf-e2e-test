import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import appState from '../../lib/appState';
import SkeletonLayout from '../skeletons/SkeletonLayout';
import Nav from './Nav';
import Seo from './Seo';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  pageTitle?: string;
  description?: string;
  noMenu?: boolean | undefined;
  noNav?: boolean | undefined;
  fullWidth?: boolean;
  noAuthRequired?: boolean;
};

const Layout = ({
  children,
  noNav,
  title,
  description,
  pageTitle,
  fullWidth,
  noAuthRequired
}: LayoutProps) => {
  const router = useRouter();

  const path: string = router.asPath;

  const [session, loading] = useSession();

  if (!loading && !session && !noAuthRequired) router.push('/login');

  const setState = useSetRecoilState(appState);
  const state = useRecoilValue(appState);

  React.useEffect(() => {
    if (session && session.user) {
      // @ts-ignore
      setState({ ...appState, user: session?.user });
    }
  }, [session, setState]);

  if (!noAuthRequired && loading) return <SkeletonLayout noNav={noNav} />;

  // console.log({ layout: state.user?.contact_information });

  return (
    <div>
      <Seo title={title} description={description} path={path} />
      <div className="h-screen bg-bg overflow-hidden flex ">
        {!noNav && <Nav path={path} />}
        <main
          className={`flex-1 relative overflow-y-auto focus:outline-none ${
            !noNav && !fullWidth && 'pt-12'
          }`}
        >
          <div className={` ${!noNav && !fullWidth && 'py-6'}`}>
            <div className="px-4 sm:px-6 md:px-0">
              {pageTitle && (
                <h1 className="text-2xl font-semibold text-gray-900">
                  {pageTitle}
                </h1>
              )}
            </div>
            <div
              className={`${!fullWidth && 'px-4 sm:px-6 max-w-5xl mx-auto'}`}
            >
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
