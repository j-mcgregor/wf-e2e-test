import { test } from '@playwright/test';

const USERNAME = 'dan@dan.com';
const PASSWORD = 'password1234';

// automates the login process and directs to home page
// from there we can add the test cases
export const login = () =>
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.fill('input[placeholder="you\\@example\\.com"]', USERNAME);
    await page.fill('input[placeholder="Password"]', PASSWORD);
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/' }*/),
      page.locator('[placeholder="Password"]').press('Enter')
    ]);
  });
