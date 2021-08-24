import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';


function getServerSidePropsWithAuth(propsWithContext?: Function){

  return async (context: GetServerSidePropsContext) => {

    const session = await getSession(context)

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    } 

    if (propsWithContext) return propsWithContext(context);

    return {}
  }
}

export default getServerSidePropsWithAuth