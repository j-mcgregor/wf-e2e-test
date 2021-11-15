const isOnVercel =
  !!process.env.NEXT_PUBLIC_VERCEL_URL || !!process.env.VERCEL_URL;
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  URL: isOnVercel
    ? isProduction
      ? `https://beta.wiserfunding.com`
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
};

export default config;
