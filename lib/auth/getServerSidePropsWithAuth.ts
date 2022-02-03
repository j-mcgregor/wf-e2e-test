import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import nextAuthConfig from './nextAuthConfig';

function getServerSidePropsWithAuth(propsWithContext?: Function) {
  return async (context: GetServerSidePropsContext) => {

    const session = await getServerSession(context, nextAuthConfig )

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
