import { withSentry } from '@sentry/nextjs';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import mockUsers from '../../../lib/mock-data/users';

/**
 * Not 100% sure this works, can remove easily
 * Revert to export default NextAuth({...})
 * - Jack
 */

const nextAuthHandler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form s be submitted.
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
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch('/your/endpoint', {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }

        const user = mockUsers[credentials.email];

        if (user) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      }
    })
    // ...add more providers here
  ],
  pages: {
    signIn: '/login'
    // signOut: '/auth/signout'
  },
  callbacks: {
    async session(session, _token) {
      // add the mock user data in the use session hook
      const user = mockUsers[session?.user?.email];
      session.user = user;
      return session;
    }
  }
  // A database is optional, but required to persist accounts in a database
});

export default withSentry(nextAuthHandler);
