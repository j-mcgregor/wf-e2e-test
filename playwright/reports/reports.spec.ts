/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

import { login } from '../helpers';

login();

// FEATURE: USER NAVIGATE TO REPORTS PAGE
// SCENARIO: USER CLICKS REPORTS LINK FROM NAV AND DIRECTS TO REPORTS PAGE
// GIVEN: I CLICK THE REPORTS LINK
// THEN: I SHOULD BE DIRECTED TO THE REPORTS PAGE

test('User can navigate to the reports page', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // CLICK REPORTS BUTTON ON HOME PAGE
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/reports' }*/),
    page.locator('text=Reports').first().click()
  ]);

  const locator = page.locator('h2:has-text("Bookmarked Reports")');
  await expect(locator).toBeVisible();
  // ---------------------
  await context.close();
  await browser.close();
});
