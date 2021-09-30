/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';

import LoginContainer from '../components/containers/LoginContainer';
import ForgotPasswordForm from '../components/forms/login/ForgotPasswordForm';
import Layout from '../components/layout/Layout';
import { useTranslations } from 'next-intl';

const ForgotPassword = () => {

  const t = useTranslations()
  return (
    <Layout noNav={true} title={`${t('forgotten_password')}`} noAuthRequired={true}>
      <LoginContainer>
         <ForgotPasswordForm /> 
      </LoginContainer>
    </Layout>
  );
};

export default ForgotPassword;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/forgotten-password.${locale}.json`),
        ...require(`../messages/${locale}/errors.${locale}.json`)
      }
    }
  };
}
