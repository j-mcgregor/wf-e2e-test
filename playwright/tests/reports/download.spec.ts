import { test, expect } from '@playwright/test';

// test.describe.only('Download CSV', () => {
//   // SCENARIO: USER NAVIGATES TO A REPORT, CLICKS 'EXPORT CSV' AND DOWNLOADS A CSV FILE
//   // FEATURE: USER CAN EXPORT A CSV FILE OF A REPORT
// });
test('User can download CSV of a report', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: './playwright/auth.json'
  });
  const page = await context.newPage();

  // GIVEN I AM ON THE HOMEPAGE
  await page.goto('/');

  // accept cookies banner
  await page.locator('text=Accept').click();

  await page.pause();

  // WHEN I NAVIGATE TO THE MOST RECENT REPORT
  await Promise.all([
    page.locator('#Recent\\ Reports tbody tr:nth-child(1)').click(),
    page.waitForNavigation({ timeout: 30000 })
  ]);

  // AND I CLICK THE 'EXPORT CSV' BUTTON
  const [download] = await Promise.all([
    // It is important to call waitForEvent before click to set up waiting.
    page.waitForEvent('download'),
    // Triggers the download.
    page.locator('text=Export CSV').click()
  ]);

  // wait for download to complete
  const path = await download.path();

  // THEN A CSV FILE OF THE REPORT SHOULD BE DOWNLOADED
  expect(path).toBeTruthy(); // download has filepath === true = success -> no obvious alternative?
});
