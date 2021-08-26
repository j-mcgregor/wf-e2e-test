import { GetServerSidePropsContext } from 'next';

import LoginContainer from '../components/containers/LoginContainer';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import Layout from '../components/layout/Layout';
import { validEmailRegex } from '../lib/regexes';

const PasswordReset = ({ email }: { email: string}) => {
  return (
    <Layout noNav={true} title="Password Reset">
      <LoginContainer>
        <ResetPasswordForm email={email} />
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

  if (!isValidEmail || !token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      email,
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
