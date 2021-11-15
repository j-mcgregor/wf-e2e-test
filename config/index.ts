/* eslint-disable no-console */
const isOnVercel =
  !!process.env.NEXT_PUBLIC_VERCEL_URL || !!process.env.VERCEL_URL;

console.log(process.env);

const config = {
  URL: isOnVercel
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
};

export default config;
