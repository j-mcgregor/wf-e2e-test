import React from 'react';
import Layout from '../components/layout/Layout';
import Link from '../components/elements/Link';
import LoginForm from '../components/forms/LoginForm';
import Image from 'next/image';
import WiserfundingLogo from '../public/images/logos/wiserfunding-logo-dark.png'

import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';

const Login = () => {
  const t = useTranslations()

  return (
    <Layout noNav={true} title="Login">
      <div className="max-w-sm">
        <Image
          src={WiserfundingLogo}
          layout="fill"
          alt="Wiserfunding Logo"
          objectFit="contain"
          placeholder="blur"
        />
      </div>

      <LoginForm />

      <div>
        <div className="bg-secondary">
          <h1>{t('sign into account')}</h1>
          <p>
            {t('register for demo', {
              a: function Linked(children: React.ReactNode) {
                return (
                  <Link
                    className="text-secondary"
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
        // eslint-disable-next-line security/detect-non-literal-require
        ...require(`../messages/${locale}/login.${locale}.json`)
      }
    }
  };
}

export default Login;
