import { test, expect } from '@playwright/test';
import { login } from '../helpers';

login();

test.describe('Report Tests', async () => {
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, INPUTS A COMPANY SEARCH AND GENERATES A REPORT

  // FEATURE: USER GENERATES A SINGLE REPORT
  test('User can generate a single report', async ({ page }) => {
    // GIVEN I CLICK THE 'SINGLE COMPANY' NAV LINK
    // AND I AM DIRECTED TO THE SME-CALC PAGE
    await page.locator('text=Single Company').first().click();

    // AND I TYPE A COMPANY NAME INTO THE SEARCH BAR
    await page.locator('[placeholder="Enter company name\\.\\.\\."]').click();

    // enter company name into the input box (eg: wiserfunding)
    await page
      .locator('[placeholder="Enter company name\\.\\.\\."]')
      .fill('a', { timeout: 5000 });

    // AND I SELECT A COMPANY FROM THE SEARCH RESULTS LIST
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

  // SCENARIO: USER NAVIGATES TO NEW REPORT, BOOKMARKS AND CHECKS IT HAS BEEN SAVED
  // FEATURE: USER BOOKMARKS A REPORT
  test('User can bookmark the report', async ({ page, context }) => {
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

    // WHEN I AM REDIRECTED TO RECENT REPORTS
    // THEN I SHOULD SEE A BOOKMARK CARD FOR THE REPORT I JUST BOOKMARKED

    const bookmark = page.locator(`#bookmark-card-${reportID}`);
    await expect(bookmark).toBeVisible();

    await page.close();
    await context.close();
    // ------------------
  });
});
