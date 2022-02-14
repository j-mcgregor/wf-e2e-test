import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// List of paths that are allowed to be accessed without authentication
const openUrls = [
  '/login',
  '/password-reset',
  '/forgotten-password',
  '/api/auth',
  'print-api'
];

export async function middleware(req: NextRequest, _res: NextResponse) {
  let url = req?.nextUrl?.clone();
  url.pathname = '/login';

  // return early if url isn't supposed to be protected
  if (openUrls.find(route => req.url?.includes(route))) {
    return NextResponse.next();
  }

  const token = await getToken({
    // @ts-ignore - Next Types need updating
    req,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // If no token then redirect back to login
  if (!token) return NextResponse.redirect(url);

  // If token i.e. user authenticated, continue.
  return NextResponse.next();
}
