import { GetStaticPropsContext } from 'next';

import LoginContainer from '../components/containers/LoginContainer';
import ParticleBackground from '../components/elements/ParticleBackground';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import Layout from '../components/layout/Layout';

const forgotPassword = () => {
  return (
    <Layout noNav={true} title="Forgotten Password">
      <ParticleBackground>
        <LoginContainer>
          <ForgotPasswordForm />
        </LoginContainer>
      </ParticleBackground>
    </Layout>
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
