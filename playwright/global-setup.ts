// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');
  await page.fill('input[placeholder="you\\@example\\.com"]', 'dan@dan.com');
  await page.fill('input[placeholder="Password"]', 'password1234');
  await page.click('button:has-text("Sign in")');
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
