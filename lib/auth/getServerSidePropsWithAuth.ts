import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import nextAuthConfig from './nextAuthConfig';

function getServerSidePropsWithAuth(propsWithContext?: Function) {
  return async (context: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      nextAuthConfig
    );

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      };
    }

    if (propsWithContext) return propsWithContext(context);

    return {};
  };
}

export default getServerSidePropsWithAuth;
