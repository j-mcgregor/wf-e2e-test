import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import env from './config';

// NECESSARY FOR TO LOAD ENV'S WITHIN THE PLAYWRIGHT TESTS
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

const config: PlaywrightTestConfig = {
  testDir: './playwright', // location of tests
  // globalSetup: require.resolve('./playwright/global-setup'),
  outputDir: './playwright/test-results',
  use: {
    headless: true,
    baseURL: env.URL,
    viewport: { width: 1920, height: 1280 },
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: './playwright/storageState.json'
  }
};
export default config;