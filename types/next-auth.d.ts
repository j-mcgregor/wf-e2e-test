import NextAuth from 'next-auth';
import { UserType } from './global';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: UserType;
  }
}
