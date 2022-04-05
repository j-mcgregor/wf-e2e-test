import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// NECESSARY FOR TO LOAD ENV'S WITHIN THE PLAYWRIGHT TESTS
dotenv.config({ path: path.resolve(__dirname, '.env.development') });

// eslint-disable-next-line no-console
console.log('config', {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  URL
});

const config: PlaywrightTestConfig = {
  testDir: './playwright', // location of tests
  // globalSetup: require.resolve('./playwright/global-setup'),
  outputDir: './playwright/test-results',
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
    viewport: { width: 1920, height: 1280 },
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: './playwright/storageState.json'
  }
  // webServer: {
  //   port: 3000,
  //   command: 'yarn dev',
  //   timeout: 120 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // }
};
export default config;
