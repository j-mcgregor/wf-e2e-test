import { test, expect } from '@playwright/test';
import { login } from '../../playwright-helpers';

test.describe('Bookmark Report', async () => {
  // SCENARIO: USER NAVIGATES TO NEWLY CREATED REPORT, BOOKMARKS IT, NAVIGATES TO 'REPORTS' TO CHECK IT WAS SUCCESSFULLY BOOKMARKED
  // FEATURE: USER CAN BOOKMARK A REPORT
  test('User can bookmark a new report', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: './playwright/auth.json'
    });
    const page = await context.newPage();

    // GIVEN I AM ON THE MOST RECENT REPORT PAGE
    await page.goto('/');
    await page.locator('#Recent\\ Reports tbody tr:nth-child(1)').click();
    await page.waitForNavigation();

    // save the reportId from the URL
    const url = new URL(page.url());
    const reportId = url.pathname.split('/').reverse()[0];

    // AND I CLICK THE 'BOOKMARK' ICON
    await page.locator('#bookmark-button').click();

    // AND I NAVIGATE TO RECENT REPORTS
    await Promise.all([
      page.waitForNavigation(),
      page.locator('text=Reports >> nth=0').click()
    ]);

    await page.pause();

    const bookmark = page.locator(`#bookmark-card-${reportId}`);

    // THEN I SHOULD SEE A BOOKMARK CARD FOR THE REPORT I JUST BOOKMARKED
    await expect(bookmark).toBeVisible();
  });
});
