import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import User from '../../../lib/funcs/user';
import mockUsers from '../../../lib/mock-data/users';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      id: 'msal',
      name: 'Microsoft Login',
      type: 'oauth',
      version: '2.0',
      scope: 'profile openid email',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}/oauth2/v2.0/token`,
      authorizationUrl: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}/oauth2/v2.0/authorize?response_type=code&response_mode=query`,
      profileUrl: 'https://graph.microsoft.com/oidc/userinfo',
      profile: async (_profile, token) => {
        // use the SSO token to get the backend api auth token
        const wfToken = await User.getSSOToken(token.id_token);
        if (wfToken.ok) {
          // use the backend api auth token to get the user information
          const user = await User.getUser(wfToken.access_token);
          if (user.ok) {
            return user;
          }
        }
        return false;
      },
      clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
      clientSecret: process.env.REACT_APP_AZURE_CLIENT_SECRET
    },

    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'name@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials, _req) {
        if (
          credentials.email === 'test@test.com' ||
          credentials.email === 'new@test.com'
        ) {
          return mockUsers[credentials.email];
        }
        // authenticate the user with the backend
        const authenticated = await User.authenticate(
          credentials.email,
          credentials.password
        );
        // // if no error and we have user data, return it
        if (authenticated && authenticated.token) {
          return await User.getUser(authenticated.token);
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt(token, user) {
      // Persist the backend access token to the token right after signin
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session(session, token, _user) {
      if (token.accessToken) {
        const user = await User.getUser(token.accessToken);

        // add the mock user data in the use session hook
        session.user = user;
        return session;
      }
      // get the user using the token stored in the token
      const user = mockUsers[session.user.email];
      session.user = user;
      return session;
    }
  }
});
