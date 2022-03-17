/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

// User Sign In:
//* Scenario: Login with valid credentials
// Given: I am on the login page
// When: I enter my valid credentials
// Then: I should be directed to the dashboard (main url)

test('User can log-in', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Go to login page
  await page.goto(`login`);

  // Click email input
  await page.locator('[placeholder="you\\@example\\.com"]').click();
  // Fill email text input
  await page.locator('[placeholder="you\\@example\\.com"]').fill('dan@dan.com');

  // Press Tab to move to password input
  await page.locator('[placeholder="you\\@example\\.com"]').press('Tab');
  // Fill password text input
  await page.locator('[placeholder="Password"]').fill('password1234');

  // Click sign in button
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://beta.wiserfunding.com/' }*/),
    page.locator('button:has-text("Sign in")').click()
  ]);

  // Expect to be on the main page
  await expect(page.locator('text=Welcome back,')).toBeVisible();

  // --------------------
  // Save storage state into the file.
  // await context.storageState({ path: './playwright/auth.json' });

  await context.close();
  await browser.close();
});
