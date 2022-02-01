import { useSession, signOut } from 'next-auth/client';

import { useRouter } from 'next/router';
import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import * as Sentry from '@sentry/react';

import appState from '../../lib/appState';
import SkeletonLayout from '../skeletons/SkeletonLayout';
import Nav from './Nav';
import Seo from './Seo';

interface LayoutProps {
  title?: string;
  pageTitle?: string;
  description?: string;
  noMenu?: boolean | undefined;
  noNav?: boolean | undefined;
  fullWidth?: boolean;
  noAuthRequired?: boolean;
  className?: string;
  children?: React.ReactNode;
  containerClassName?: string;
}

const Layout = ({
  noNav,
  title,
  description,
  pageTitle,
  fullWidth,
  noAuthRequired,
  className,
  children,
  containerClassName
}: LayoutProps) => {
  const router = useRouter();

  const path: string = router.asPath;

  const [session, loading] = useSession();

  if (!loading && !session && !noAuthRequired) router.push('/login');

  const setState = useSetRecoilState(appState);
  const { user } = useRecoilValue(appState);

  React.useEffect(() => {
    // if there is a session but no token
    // sign the user out
    // this is to handle the instances of a backend update
    // the users access token will be invalidated
    if (session && !session?.token) {
      signOut();
    }

    if (session && session.user && !user) {
      // set sentry to identify user
      Sentry.setUser({ email: session.user.email || '' });
      // @ts-ignore
      setState({ ...appState, user: { ...session?.user } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, setState]);

  if (!noAuthRequired && loading) return <SkeletonLayout noNav={noNav} />;

  return (
    <div>
      <Seo title={title} description={description} path={path} />
      <div className="h-screen bg-bg overflow-hidden flex ">
        {!noNav && <Nav path={path} />}
        <main
          className={`flex-1 relative overflow-y-auto focus:outline-none ${
            !noNav && !fullWidth && 'pt-12'
          } ${className}`}
        >
          <div className={` ${!noNav && !fullWidth ? 'py-6' : ''} h-full`}>
            <div className="px-4 sm:px-6 md:px-0">
              {pageTitle && (
                <h1 className="text-2xl font-semibold text-gray-900">
                  {pageTitle}
                </h1>
              )}
            </div>

            <div
              className={`${
                !fullWidth ? 'px-4 sm:px-6 max-w-5xl mx-auto' : ''
              } ${containerClassName}`}
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
