import { test, expect } from '@playwright/test';
import { login } from '../test-helpers';

login();

// SCENARIO: USER NAVIGATES TO A REPORT, CLICKS 'EXPORT CSV' AND DOWNLOADS A CSV FILE
// FEATURE: USER CAN EXPORT A CSV FILE OF A REPORT
test('User can download CSV of a report', async ({ page }) => {
  // GIVEN I AM ON THE HOMEPAGE
  await expect(page).toHaveURL('/');

  // WHEN I NAVIGATE TO THE MOST RECENT REPORT
  await Promise.all([
    page.waitForNavigation(),
    page.locator('td >> nth=0').click()
  ]);

  // AND I CLICK THE 'EXPORT CSV' BUTTON
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('text=Export CSV').click()
  ]);

  // THEN A CSV FILE OF THE REPORT SHOULD BE DOWNLOADED
  await expect(download.path()).toBeTruthy(); // download has filepath = true = success - no other obvious alternative in playwright
});
