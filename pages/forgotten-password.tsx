import React from 'react';
import LoginContainer from '../components/containers/LoginContainer';
import Logo from '../components/elements/Logo';

import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';

const forgotPassword = () => {
  const t = useTranslations();
  return (
    <LoginContainer>
      <form>
        <div>
          <Logo />
          <h1 className="text-3xl font-bold py-3">{t('forgotten password')}</h1>
          <p>{t('enter email')}</p>
          <div>
            <label htmlFor="email" className="block text-sm font-medium py-2">
              {t('email address')}
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
        >
          {t('sign in')}
        </button>
      </form>
    </LoginContainer>
  );
};

export default forgotPassword;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        // eslint-disable-next-line security/detect-non-literal-require
        ...require(`../messages/${locale}/forgotten-password.${locale}.json`)
      }
    }
  };
}
