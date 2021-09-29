import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import mockUsers from '../../../lib/mock-data/users';

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
        if (credentials.email === 'test@test.com') {
          return mockUsers[credentials.email];
        }
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(
          'https://api.saggio-credito.co.uk/api/v1/login/access-token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
              username: credentials.email,
              password: credentials.password
            })
          }
        );

        const json = await res.json();
        const token = json.access_token;

        // const user = await res.json();
        const user = mockUsers[credentials.email];

        // // If no error and we have user data, return it
        if (res.ok) {
          const resMe = await fetch(
            'https://api.saggio-credito.co.uk/api/v1/users/me',
            {
              method: 'GET',
              headers: {
                'Content-Type':
                  'application/x-www-form-urlencoded;charset=UTF-8',
                Authorization: `Bearer ${token}`
              }
            }
          );

          const user = await resMe.json();
          // eslint-disable-next-line no-console
          console.log(user);

          return user;
        }

        // if (user) {
        //   return user;
        // }

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
