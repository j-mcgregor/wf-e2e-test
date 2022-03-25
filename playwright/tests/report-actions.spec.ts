/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';
import { login } from '../test-helpers';

login();

test.describe('Report Tests', async () => {
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, INPUTS A COMPANY SEARCH AND GENERATES A REPORT
  // FEATURE: USER GENERATES A SINGLE REPORT
  test('User can auto generate a report', async ({ page }) => {
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

    await expect(page.locator('h1:has-text("A LIMITED")')).toBeVisible();
  });

  // --------------------------------------------------

  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, MAKES AN ADVANCED SEARCH WITH A COMPANY ID AND CHANGES CURRENCY
  // FEATURE: USER CREATES A MANUAL REPORT
  test('User can manually generate a report', async ({ page }) => {
    // GIVEN I CLICK THE 'SINGLE COMPANY' NAV LINK
    await page.locator('text=Single Company').first().click();

    // WHEN I CLICK THE 'ADVANCED SEARCH' BUTTON
    await page.locator('text=Advanced Search').click();

    // THEN I CLICK THE COMPANY REGISTRATION NUMBER INPUT
    await page.locator('[placeholder="\\31 23456789"]').click();

    // AND I ENTER A VALID COMPANY REGISTRATION NUMBER
    await page.locator('[placeholder="\\31 23456789"]').fill('10754754');
    // THEN I CHANGE THE DEFAULT CURRENCY FROM GBP TO USD
    await page.locator('button:has-text("United Kingdom - GBP (£)")').click();
    await page.locator('text=United States - USD ($)').click();

    // WHEN I CLICK THE 'GENERATE REPORT' BUTTON
    await page.locator('text=Generate Report').click();
    await page.waitForSelector('h1:has-text("CHOPOVA LOWENA LIMITED")', {
      timeout: 30000
    });

    // THEN THE REPORT SHOULD GENERATE AND I SHOULD BE DIRECTED TO THE CORRECT COMPANY REPORT PAGE
    await expect(
      page.locator('h1:has-text("CHOPOVA LOWENA LIMITED")')
    ).toBeVisible();

    // AND THE REPORT SHOULD BE GENERATED IN USD
    await expect(page.locator('p:has-text("USD")')).toBeVisible();
  });

  // --------------------------------------------------

  // SCENARIO: USER NAVIGATES TO NEWLY CREATED REPORT, BOOKMARKS IT, AND NAVIGATES TO 'REPORTS' TO CHECK IT WAS SUCCESSFULLY BOOKMARKED
  // FEATURE: USER BOOKMARKS A REPORT
  test('User can bookmark a report', async ({ page }) => {
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

  // --------------------------------------------------

  // ! BLOCKED ON PRINT REPORT TEST
  // SCENARIO: USER NAVIGATES TO A REPORT AND PRINTS IT
  // FEATURE: USER CAN PRINT A REPORT
  // test('User can print a report', async ({ page }) => {
  //   // await Promise.all([
  //   //   page.waitForNavigation(),
  //   //   page.locator('td >> nth=0').click()
  //   // ]);
  //  // await page.locator('text=Export PDF').click();
  //   await expect(page.url()).toContain('/print');
  //   // Click text=A LIMITED-24-03-22-15:11
  //   await Promise.all([
  //     page.waitForNavigation(/*{ url: 'http://localhost:3000/report/8c2d1c76-fa23-4a88-add5-238aa305b924' }*/),
  //     page.locator('text=A LIMITED-24-03-22-15:11').click()
  //   ]);
  //   // Click text=Export PDF
  //   await Promise.all([
  //     page.waitForEvent('popup'),
  //     page.waitForNavigation(/*{ url: 'http://localhost:3000/report/8c2d1c76-fa23-4a88-add5-238aa305b924/print' }*/),
  //     page.locator('text=Export PDF').click()
  //   ]);
  //   await expect(page.url()).toContain('/print');
  // });
});
