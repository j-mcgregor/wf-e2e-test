import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import mockUsers from '../../../lib/mock-data/users';
import User from '../../../lib/funcs/user';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
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

        if (credentials.email === 'test@test.com' || credentials.email === 'new@test.com') {
          return mockUsers[credentials.email];
        }

        // authenticate the user with the backend
        const authenticated = await User.authenticate(credentials.email, credentials.password)
        // // if no error and we have user data, return it
        if (authenticated && authenticated.token) {
          return await User.getUser(authenticated.token) ;
        }

        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt(token, user) {
      // Persist the backend access token to the token right after signin   
      if (user) {
        token.accessToken = user.token
      }
      return token
    },
    async session(session, token, _user) {

      if (token.accessToken) {
        const user = await User.getUser(token.accessToken)

        // add the mock user data in the use session hook
        session.user = user;
        return session;
      }
      // get the user using the token stored in the token
      const user = mockUsers[session.user.email]
      session.user = user
      return session 
    }
  }
});
