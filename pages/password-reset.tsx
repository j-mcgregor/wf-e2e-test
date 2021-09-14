import { GetServerSidePropsContext } from 'next';

import LoginContainer from '../components/containers/LoginContainer';
import ResetPasswordForm from '../components/forms/login/ResetPasswordForm';
import Layout from '../components/layout/Layout';
import { validEmailRegex } from '../lib/utils/regexes';

const PasswordReset = ({ email, isValid }: { email: string, isValid: boolean}) => {
  return (
    <Layout noNav={true} title="Password Reset" noAuthRequired={true}>
      <LoginContainer>
        <ResetPasswordForm email={email} isValid={isValid} />
      </LoginContainer>
    </Layout>
  );
};

export default PasswordReset;

export async function getServerSideProps({ locale, query }: GetServerSidePropsContext) {
  const email = `${query.email}`
  const token = `${query.token}`


  const isValidEmail = email &&  validEmailRegex.test(email)

  // make a request to determine if the token is valid on the backend
  // const isValidToken = await validateToken(token)

  return {
    props: {
      email,
      isValid: (isValidEmail && token),
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        // eslint-disable-next-line security/detect-non-literal-require
        ...require(`../messages/${locale}/reset-password.${locale}.json`)
      }
    }
  };
}
