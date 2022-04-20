import { test, expect } from '@playwright/test';
import { login } from '../../playwright-helpers';

test.describe('Bookmark Report', async () => {
  login();
  // --------------------------------------------------

  // SCENARIO: USER NAVIGATES TO NEWLY CREATED REPORT, BOOKMARKS IT, NAVIGATES TO 'REPORTS' TO CHECK IT WAS SUCCESSFULLY BOOKMARKED
  // FEATURE: USER CAN BOOKMARK A REPORT
  test('User can bookmark a new report', async ({ page }) => {
    // GIVEN I AM ON THE DASHBOARD PAGE
    await page.goto('/');

    // WHEN I NAVIGATE TO THE MOST RECENT REPORT
    await Promise.all([
      page.waitForNavigation(),
      page.locator('#reports-table tbody tr:nth-child(1)').click()
    ]);

    // AND I CLICK THE 'BOOKMARK' ICON
    await page.locator('#bookmark-button').click();

    const reportID = page.url().split('/').reverse()[0]; // store report id from url

    // AND I NAVIGATE TO RECENT REPORTS
    await Promise.all([
      page.waitForNavigation(),
      page.locator('text=Back to saved reports').click()
    ]);

    const bookmark = page.locator(`#bookmark-card-${reportID}`);

    // THEN I SHOULD SEE A BOOKMARK CARD FOR THE REPORT I JUST BOOKMARKED
    await expect(bookmark).toBeVisible();
  });
});
