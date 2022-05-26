/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect, chromium } from '@playwright/test';

// FEATURE: USER LOGS IN
// SCENARIO: USER GOES TO LOGIN PAGE, ENTERS VALID CREDENTIALS, SIGNS IN AND IS TAKEN TO DASHBOARD
test.skip('User can log-in', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // GIVE I NAVIGATE TO LOGIN PAGE
  await page.goto(`login`);

  // WHEN I CLICK THE EMAIL INPUT
  await page.locator('[placeholder="you\\@example\\.com"]').click();
  // AND I FILL IN MY EMAIL ADDRESS
  await page
    .locator('[placeholder="you\\@example\\.com"]')
    .fill(`${process.env.PLAYWRIGHT_LOGIN_USERNAME}`);

  // THEN I SELECT THE PASSWORD INPUT
  await page.locator('[placeholder="you\\@example\\.com"]').press('Tab');
  // AND I FILL IN MY PASSWORD
  await page
    .locator('[placeholder="Password"]')
    .fill(`${process.env.PLAYWRIGHT_LOGIN_PASSWORD}`);

  // WHEN I CLICK THE SIGN IN BUTTON
  await page.locator('button:has-text("Sign in")').click();

  // Create a new context with the saved storage state.
  await context.storageState({ path: 'auth.json' });

  // THEN I AM TAKEN TO THE HOME URL AND 'WELCOME BACK' IS DISPLAYED
  await expect(page).toHaveURL('/');
  await expect(page.locator('text=Welcome back,')).toBeVisible();
});
