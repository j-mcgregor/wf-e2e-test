// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // go to base URL
  await page.goto(baseURL!);
  // fill in email input
  await page.fill(
    'input[placeholder="you\\@example\\.com"]',
    `${process.env.PLAYWRIGHT_LOGIN_USERNAME}`
  );
  // fill in password input
  await page.fill(
    'input[placeholder="Password"]',
    `${process.env.PLAYWRIGHT_LOGIN_PASSWORD}`
  );

  // click sign in button
  await Promise.all([
    page.waitForNavigation(),
    page.locator('[placeholder="Password"]').press('Enter')
  ]);

  await page.context().storageState({ path: storageState as string });

  // accept cookies banner
  await page.locator('text=Accept').click();

  await browser.close();
}

export default globalSetup;
