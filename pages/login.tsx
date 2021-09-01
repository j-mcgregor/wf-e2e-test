import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

import LoginContainer from '../components/containers/LoginContainer';
import Link from '../components/elements/Link';
import Logo from '../components/elements/Logo';
import LoginForm from '../components/forms/LoginForm';
import LoginSSO from '../components/forms/LoginSSO';
import Layout from '../components/layout/Layout';

const Login = () => {
  const t = useTranslations();

  return (
    <Layout noNav={true} title="Login">
      <LoginContainer>
        <div>
          <Logo />
          <div>
            <div className="bg-secondary">
              <h1 className="text-xl md:text-3xl font-bold py-3">
                {t('sign into account')}
              </h1>
              <p className="text-sm text-highlight">
                {t('register for demo', {
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
          <LoginForm />
        </div>
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
        // eslint-disable-next-line security/detect-non-literal-require
        ...require(`../messages/${locale}/login.${locale}.json`)
      }
    }
  };
}

export default Login;
