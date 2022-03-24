import { test, expect } from '@playwright/test';
import { login } from '../test-helpers';

login();

test.describe('Report Tests', async () => {
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, INPUTS A COMPANY SEARCH AND GENERATES A REPORT

  // FEATURE: USER GENERATES A SINGLE REPORT
  test('User can generate a single report', async ({ page }) => {
    // GIVEN I CLICK THE 'SINGLE COMPANY' NAV LINK
    await page.locator('text=Single Company').first().click();

    // THEN I SHOULD BE TAKEN TO THE SME-CALC PAGE
    await expect(page).toHaveURL('sme-calculator');

    // WHEN I TYPE A COMPANY NAME INTO THE SEARCH BAR
    await page.locator('[placeholder="Enter company name\\.\\.\\."]').click();

    await page
      .locator('[placeholder="Enter company name\\.\\.\\."]')
      .fill('a', { timeout: 5000 });

    // AND I SELECT A COMPANY FROM THE SEARCH RESULTS
    await page
      .locator(
        'button:has-text("A LIMITED117902152019-01-2838 Springfield Road, Gillingham, Kent, England, ME7 1")'
      )
      .click();

    // WHEN I CLICK THE 'GENERATE REPORT' BUTTON
    await page.locator('text=Generate Report').click();

    // THEN A REPORT SHOULD GENERATE AND I SHOULD BE DIRECTED TO THE CORRECT COMPANY REPORT PAGE
    await page.waitForSelector('h1:has-text("A LIMITED")', {
      timeout: 30000
    }); // <-- trick is to use waitForSelector()
  });

  // SCENARIO: USER NAVIGATES TO NEWLY CREATED REPORT, BOOKMARKS IT, AND NAVIGATES TO 'REPORTS' TO CHECK IT WAS SUCCESSFULLY BOOKMARKED
  // FEATURE: USER BOOKMARKS A REPORT
  test('User can bookmark a report', async ({ page, context }) => {
    // WHEN I NAVIGATE TO THE MOST RECENT REPORT
    await Promise.all([
      page.waitForNavigation(),
      page.locator('td >> nth=0').click()
    ]);

    // store report id from url
    const reportID = page.url().split('/')[4];

    // AND I CLICK THE 'BOOKMARK' ICON
    await page.locator('#bookmark-button').click();

    // AND I NAVIGATE TO RECENT REPORTS
    await Promise.all([
      page.waitForNavigation(),
      page.locator('text=Back to saved reports').click()
    ]);

    const bookmark = page.locator(`#bookmark-card-${reportID}`);

    // WHEN I AM REDIRECTED TO RECENT REPORTS
    // THEN I SHOULD SEE A BOOKMARK CARD FOR THE REPORT I JUST BOOKMARKED
    await expect(bookmark).toBeVisible();
  });
});
