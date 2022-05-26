/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';

test.describe('Generate report with API', async () => {
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, INPUTS A COMPANY SEARCH AND GENERATES A REPORT
  // FEATURE: USER GENERATES A SINGLE REPORT
  test('User can generate report via API search', async ({ browser }) => {
    const context = await browser.newContext({
      storageState: './playwright/auth.json'
    });
    const page = await context.newPage();

    test.setTimeout(120000);

    // GIVEN I AM ON THE HOMEPAGE
    await page.goto('/');

    // accept cookies banner
    await page.locator('text=Accept').click();

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

    await page.waitForNavigation({ timeout: 30000 });

    await expect(page.locator('h1:has-text("A LIMITED")')).toBeVisible({
      timeout: 60000
    });
  });
});

test.describe('Generate report with Company ID', async () => {
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, MAKES AN ADVANCED SEARCH WITH A COMPANY ID AND CHANGES CURRENCY
  // FEATURE: USER CREATES A MANUAL REPORT
  test('User can generate report via company ID & custom currency', async ({
    browser
  }) => {
    const context = await browser.newContext({
      storageState: './playwright/auth.json'
    });
    const page = await context.newPage();

    // GIVEN I AM ON THE HOMEPAGE
    await page.goto('/');

    // accept cookies banner
    await page.locator('text=Accept').click();

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

    await page.waitForNavigation({ timeout: 30000 });

    await page.waitForSelector('h1:has-text("CHOPOVA LOWENA LIMITED")', {
      timeout: 40000
    });

    // THEN THE REPORT SHOULD GENERATE AND I SHOULD BE DIRECTED TO THE CORRECT COMPANY REPORT PAGE
    await expect(
      page.locator('h1:has-text("CHOPOVA LOWENA LIMITED")')
    ).toBeVisible();

    // AND THE REPORT SHOULD BE GENERATED IN USD
    await expect(page.locator('p:has-text("USD")')).toBeVisible();
  });
});
