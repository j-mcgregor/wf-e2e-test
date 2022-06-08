// eslint-disable-next-line no-console
// console.log({ env: process.env });

/**
 * For Wiserfunding purposes, we will have 3 'production' builds in Vercel, for different purposes:
 * production  - client-facing, production API @ risk.wiserfunding.com
 * staging     - internal, sandbox API for user-acceptance testing @ <undetermined>.wiserfunding.com
 * development - internal, development API for basic PRs and monitoring @ beta.wiserfunding.com
 */
let URL = '';
let WF_ENV = 'local';

// NODE_ENV === 'production' on live AND preview
if (process.env.NODE_ENV === 'production') {
  if (process.env.VERCEL_ENV === 'preview') {
    WF_ENV = 'development';
    URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (process.env.VERCEL_ENV === 'production') {
    URL = 'https://risk.wiserfunding.com';
    WF_ENV = 'production';
  }
} else if (
  process.env.NODE_ENV === 'test' &&
  process.env.VERCEL_ENV === 'preview'
) {
  URL = `${process.env.VERCEL_URL}`;
} else {
  URL = 'http://localhost:3000';
}
const config = {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_ENV: process.env.VERCEL_ENV,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  API_URL: process.env.WF_AP_ROUTE,
  URL,
  IS_TEST: process.env.NODE_ENV === 'test',
  WF_ENV
};

export default config;
