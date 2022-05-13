/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import Auth from '../lib/utils/auth-helpers';

import LoginContainer from '../components/containers/LoginContainer';
import Logo from '../components/elements/Logo';
import Layout from '../components/layout/Layout';
import LoadingIcon from '../components/svgs/LoadingIcon';

const LogOut = () => {
  const t = useTranslations();

  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    const signout = async () => {
      const token = session?.token;

      if (token) {
        // invalidate the token on the backend
        await Auth.invalidateAuthToken(`${token}`);
      }

      // log out of sentry
      Sentry.configureScope(scope => scope.setUser(null));

      // // signout of next-auth
      signOut({ callbackUrl: `${window.location.origin}/login` });
    };

    if (session && session.user) {
      signout();
    }
  }, [session]);

  return (
    <Layout noNav={true} title="Login" noAuthRequired={true}>
      <LoginContainer>
        {!loading && !session ? (
          <div>
            <Logo />
            <div>
              <div className="bg-secondary">
                <h1 className="text-xl md:text-3xl font-bold py-3">
                  {t('thank_you')}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="bg-secondary">
                <h1 className="text-xl md:text-3xl font-bold py-3 text-center mb-8">
                  {t('signing_out')}
                </h1>
                <LoadingIcon stroke="white" className="mx-auto h-10 w-10" />
              </div>
            </div>
          </div>
        )}
      </LoginContainer>
    </Layout>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/logout.${locale}.json`),
        ...require(`../messages/${locale}/errors.${locale}.json`)
      }
    }
  };
}

export default LogOut;
function setLastPageVisited(arg0: string) {
  throw new Error('Function not implemented.');
}
