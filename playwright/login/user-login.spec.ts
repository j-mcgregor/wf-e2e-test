/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

// FEATURE: USER SIGN IN
// SCENARIO: USER CAN SIGN IN & REDIRECT TO DASHBOARD
// GIVEN: I AM SIGNED OUT
// AND: I AM ON THE LOGIN PAGE
// WHEN: I ENTER MY VALID CREDENTIALS
// AND: I CLICK THE SIGN IN BUTTON
// THEN: I SHOULD BE REDIRECTED TO THE DASHBOARD

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
  await context.close();
  await browser.close();
});
