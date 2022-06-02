import config from '../../config';
import { fetchWrapper } from './fetchWrapper';

const invalidateAuthToken = async (token: string) => {
  const res = await fetchWrapper(
    `${config.API_URL}/api/v1/oauth2/token/invalidate/${token}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (res.status === 200) {
    return true;
  }
  return false;
};

const Auth = {
  invalidateAuthToken
};

export default Auth;
