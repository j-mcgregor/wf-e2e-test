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

import React, { useEffect } from 'react';

import LoadingIcon from '../components/svgs/LoadingIcon';
import useLocalStorage from '../hooks/useLocalStorage';

const Login = () => {
  const t = useTranslations();
  const router = useRouter();

  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [userLoginTime, setUserLoginTime] = useLocalStorage<number[]>(
    'wf_last_login',
    []
  );
  const [homePage] = useLocalStorage<string>('wf_home_page', '');
  const [lastPageVisited] = useLocalStorage<string>('wf_last_page_visited', '');

  useEffect(() => {
    setUserLoginTime([currentTimeAndDate, userLoginTime[0]]);
  }, []);

  //checks local for home_page default redirect
  const defaultHomepageRedirect = (homePage: string) => {
    let local = homePage;
    switch (homePage) {
      case 'reports':
        local = '/reports';
        break;
      case 'single_report':
        local = '/sme-calculator';
        break;
      case 'multiple_reports':
        local = '/batch-reports';
        break;
      default:
        local = '/';
    }
    return local;
  };

  if (!loading && session) {
    // check localstorage for last page component visited, if present and not empty string, push that page
    if (lastPageVisited && lastPageVisited !== '') {
      router.push(`${lastPageVisited}`);
    } else {
      const redirectPath = defaultHomepageRedirect(homePage);
      router.push(`${redirectPath}`);
    }
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
            <LoginForm defaultHomepageRedirect={defaultHomepageRedirect} />
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
