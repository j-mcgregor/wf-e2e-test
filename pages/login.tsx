/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

import LoginContainer from '../components/containers/LoginContainer';
import Link from '../components/elements/Link';
import Logo from '../components/elements/Logo';
import LoginForm from '../components/forms/login/LoginForm';
import LoginSSO from '../components/forms/login/LoginSSO';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { checkCookies, getCookie } from 'cookies-next';

import React, { useEffect } from 'react';

import LoadingIcon from '../components/svgs/LoadingIcon';
import useLocalStorage from '../hooks/useLocalStorage';
import { CookieValueTypes } from 'cookies-next/lib/types';

const Login = () => {
  const t = useTranslations();
  const router = useRouter();

  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [userLoginTime, setUserLoginTime] = useLocalStorage<number[]>(
    'wf_last_login',
    []
  );

  useEffect(() => {
    setUserLoginTime([currentTimeAndDate, userLoginTime[0]]);
  }, []);

  const defaultLoginRedirect = new Promise<string>((resolve, reject) => {
    let cookie: CookieValueTypes = checkCookies('home_page');
    if (cookie) {
      const homePage = getCookie('home_page');
      switch (homePage) {
        case 'reports':
          cookie = '/reports';
          break;
        case 'single_report':
          cookie = '/sme_calculator';
          break;
        default:
          cookie = '/';
      }
      resolve(cookie);
    } else {
      reject('/');
    }
  });

  const routeRedirect = async () => {
    return await defaultLoginRedirect;
  };

  if (!loading && session) {
    return routeRedirect().then(route => {
      return router.push(`${route}`);
    });
  }

  const currentTimeAndDate = Date.now();

  return (
    <Layout noNav={true} title="Login" noAuthRequired={true}>
      <LoginContainer>
        {!loading && !session ? (
          <div>
            <Logo />
            <div>
              <div className="bg-secondary">
                <h1 className="text-xl md:text-3xl font-bold py-3">
                  {t('sign_into_account')}
                </h1>
                <p className="text-sm text-highlight">
                  {t.rich('register_for_demo', {
                    a: function Linked(children: React.ReactNode) {
                      return (
                        <Link
                          className="text-highlight"
                          linkTo="https://wiserfunding.com/free-trial"
                        >
                          {children}
                        </Link>
                      );
                    }
                  })}
                </p>
              </div>
            </div>
            <LoginSSO />
            <LoginForm routeRedirect={routeRedirect} />
          </div>
        ) : (
          <div>
            <div>
              <div className="bg-secondary">
                <h1 className="text-xl md:text-3xl font-bold py-3 text-center mb-8">
                  {t('loading')}
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
        ...require(`../messages/${locale}/login.${locale}.json`),
        ...require(`../messages/${locale}/errors.${locale}.json`)
      }
    }
  };
}

export default Login;
