// eslint-disable-next-line no-console
// console.log({ env: process.env });

let URL = '';

// NODE_ENV === 'production' on live AND preview
if (process.env.NODE_ENV === 'production') {
  if (process.env.VERCEL_ENV === 'preview') {
    URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (process.env.VERCEL_ENV === 'production') {
    URL = 'https://risk.wiserfunding.com';
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
  URL
};

export default config;
