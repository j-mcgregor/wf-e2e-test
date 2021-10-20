const isProduction = process.env.NODE_ENV === 'production';

const config = {
  URL: isProduction ? 'https://beta.wiserfunding.com' : 'http://localhost:3000'
};

export default config;
