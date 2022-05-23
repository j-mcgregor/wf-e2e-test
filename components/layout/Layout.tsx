/* eslint-disable sonarjs/cognitive-complexity */
import { useSession, signOut } from 'next-auth/react';

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import SkeletonLayout from '../skeletons/SkeletonLayout';
import Nav from './Nav';
import Seo from './Seo';
import useUser from '../../hooks/useUser';
import ErrorSkeleton from '../skeletons/ErrorSkeleton';
import useHubspotChat from '../../hooks/useHubspotChat';
import useLocalStorage from '../../hooks/useLocalStorage';
import useSessionStorage from '../../hooks/useSessionStorage';
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
  adminRequired?: boolean;
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
  containerClassName,
  adminRequired
}: LayoutProps) => {
  const router = useRouter();

  const path: string = router.asPath;

  // renamed for consistency
  const { data: session, status } = useSession();
  const { user, isAdmin, loading, error, isError } = useUser(!noAuthRequired);
  const { HubspotScript } = useHubspotChat('4623266', true, user);
  const [, setHomePage] = useLocalStorage<string>('wf_home_page', '');

  React.useEffect(() => {
    if (user) {
      // set sentry to identify user
      Sentry.setUser({ email: user.email || '' });
      setHomePage(user?.preferences?.defaults?.home_page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!loading && adminRequired && !isAdmin && user) {
    router.push('/no-access');
    return <SkeletonLayout />;
  }

  if (!loading && !session && !noAuthRequired && status !== 'loading')
    router.push('/login');

  if (!noAuthRequired && loading) return <SkeletonLayout noNav={noNav} />;
  //@ts-ignore

  if (!noAuthRequired && isError)
    return <ErrorSkeleton header={`${error?.message}`} code={error?.status} />;

  return (
    <div>
      <HubspotScript />
      <Seo title={title} description={description} path={path} />
      <div className="h-screen bg-bg overflow-hidden flex ">
        {!noNav && user && <Nav path={path} isAdmin={isAdmin} />}
        <main
          className={`flex-1 relative overflow-y-auto focus:outline-none ${
            !noNav && !fullWidth && 'pt-12'
          } ${className}`}
        >
          <div className={` ${!noNav && !fullWidth ? 'py-6' : ''} h-full`}>
            <div className="px-4 sm:px-6 md:px-0">
              {pageTitle && user && (
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
              {(user || noAuthRequired) && children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
