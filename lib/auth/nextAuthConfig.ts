import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../funcs/user';
import GoogleProvider from 'next-auth/providers/google';

const GOOGLE_CLIENT = 'google';
const MICROSOFT_CLIENT = 'microsoft';

const nextAuthConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    {
      id: 'msal',
      name: 'Microsoft Login',
      type: 'oauth',
      version: '2.0',
      wellKnown:
        'https://login.microsoftonline.com/common/.well-known/openid-configuration',
      userinfo: 'https://graph.microsoft.com/oidc/userinfo',
      // @ts-ignore
      profile: async (_profile, token) => {
        // use the SSO token to get the backend api auth token
        const wfToken = await User.getSSOToken(
          `${token.id_token}`,
          MICROSOFT_CLIENT
        );
        if (wfToken.ok) {
          // use the backend api auth token to get the user information
          const req = await User.getUser(`${wfToken.access_token}`, {});

          if (req.ok) {
            return {
              ...req.user,
              is_sso: 'microsoft',
              accessToken: wfToken.access_token
            };
          }
        }
        return false;
      },
      clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
      clientSecret: process.env.REACT_APP_AZURE_CLIENT_SECRET
    },
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      // @ts-ignore
      profile: async (_profile, token) => {
        const wfToken = await User.getSSOToken(
          `${token.id_token}`,
          GOOGLE_CLIENT
        );

        if (wfToken.ok) {
          // use the backend api auth token to get the user information
          const req = await User.getUser(`${wfToken.access_token}`, {});
          if (req.ok) {
            return {
              ...req.user,
              is_sso: 'google',
              accessToken: wfToken.access_token
            };
          }
        }
        return false;
      }
    }),
    CredentialsProvider({
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
        // authenticate the user with the backend
        const authenticated = await User.authenticate(
          `${credentials?.email}`,
          `${credentials?.password}`
        );
        // // if no error and we have user data, return it
        if (authenticated && authenticated.token) {
          const result = await User.getUser(authenticated.token, {});
          return {
            ...result.user,
            is_sso: false,
            accessToken: authenticated.token
          };
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],

  //HINT: is this showing login screen unexpectedly due to error?
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login'
  },

  callbacks: {
    // async signIn({ account, profile }) {

    // },
    async jwt({ token, user }) {
      // Persist the backend access token to the token right after sign in
      if (user) {
        token.accessToken = user?.accessToken;
        token.is_sso = user?.is_sso;
        token.maxAge = 7 * 24 * 60 * 60;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        const req = await User.getUser(`${token.accessToken}`, {});

        // if there is no user or the user cannot be authenticated
        // then revoke the session accessToken
        // this will trigger a logout through the Layout Component
        if (!req.ok) {
          session.token = '';
          return session;
        }
        // add the mock user data in the use session hook
        session.user = {
          ...req.user,
          // @ts-ignore
          is_sso: token.is_sso
        };
        session.token = token.accessToken;
        return session;
      }

      return session;
    }
  }
};

export default nextAuthConfig;
