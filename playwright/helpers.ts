import { test } from '@playwright/test';
import { chromium } from 'playwright';

const USERNAME = 'dan@dan.com';
const PASSWORD = 'password1234';

// automates the login process and directs to home page
// from there we can add the test cases
export const login = () =>
  test.beforeEach(async ({ page }) => {
    // go to base URL
    await page.goto('/');
    // fill in email input
    await page.fill('input[placeholder="you\\@example\\.com"]', USERNAME);
    // fill in password input
    await page.fill('input[placeholder="Password"]', PASSWORD);

    // click sign in button
    await Promise.all([
      page.waitForNavigation(),
      page.locator('[placeholder="Password"]').press('Enter')
    ]);
    // accept cookies banner
    await page.locator('text=Accept').click();
  });
