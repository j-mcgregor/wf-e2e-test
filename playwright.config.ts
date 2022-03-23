import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './playwright', // location of tests
  // globalSetup: require.resolve('./playwright/global-setup'),
  outputDir: './playwright/test-results',
  use: {
    headless: false,
    baseURL: 'http://localhost:3000',
    viewport: { width: 1280, height: 720 },
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: './playwright/storageState.json'
  }
};
export default config;
