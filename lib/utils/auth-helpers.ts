import config from '../../config';

const invalidateAuthToken = async (token: string) => {
  const res = await fetch(
    `${config.API_URL}/api/v1/oauth2/token/invalidate/${token}`,
    {
      method: 'GET',
      headers: {
        AUthorization: `Bearer ${token}`
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
