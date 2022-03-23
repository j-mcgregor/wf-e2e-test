import { test, expect } from '@playwright/test';
import { login } from '../helpers';

login();

// SCENARIO: USER NAVIGATES TO REPORT, CLICKS PRINT AND SAVES PDF
// FEATURE: USER SAVES PDF

test('User can print the report', async ({ page, context }) => {
  // WHEN I NAVIGATE TO THE MOST RECENT REPORT
  await Promise.all([
    page.waitForNavigation(),
    page.locator('td >> nth=0').click()
  ]);

  // Click text=Export PDF
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.waitForNavigation(),
    page.locator('text=Export PDF').click()
  ]);

  await page.close();
  await context.close();
  // ------------------
});
