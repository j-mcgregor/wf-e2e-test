const isProduction = process.env.NODE_ENV === 'production';
const isOnVercel = !!process.env.VERCEL_URL;

const config = {
  URL:
    isProduction && isOnVercel
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
};

export default config;
