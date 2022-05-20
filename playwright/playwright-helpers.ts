import { test } from '@playwright/test';

export const testCSVFile = 'master.csv'; // name of test file for the manual uploads

// automates the login process and directs to home page
// from there we can add the test cases
export const login = () =>
  test.beforeEach(async ({ page }) => {
    // go to base URL
    await page.goto('/');
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
    // accept cookies banner
    await page.locator('text=Accept').click();
  });
