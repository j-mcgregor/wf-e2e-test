import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// List of paths that are allowed to be accessed without authentication
const openUrls = [
  '/login',
  '/password-reset',
  '/forgotten-password',
  '/api/auth',
  'print-api',
  '/api/has-new-deploy'
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
  if (!token && req?.page?.name) return NextResponse.redirect(url);

  // change to rewrite for now to catch all routes
  // issues with the rewrite on vercel
  // see this issue https://github.com/vercel/next.js/issues/33044
  // if (!token) return NextResponse.rewrite(url);

  // If token i.e. user authenticated, continue.
  return NextResponse.next();
}
