/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';
import { WiserfundingE2E } from '../../playwright-helpers';

test.describe('SME Calculator Basic and download', async () => {
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, INPUTS A COMPANY SEARCH AND GENERATES A REPORT
  // FEATURE: USER GENERATES A SINGLE REPORT
  test('User can run an ADS report', async ({ browser }) => {
    test.setTimeout(120000);

    const REPORT_NAME = 'A LIMITED';

    const page = await WiserfundingE2E.createPage(browser);
    const WF = new WiserfundingE2E(page);

    // GIVEN I AM ON THE SME CALCULATOR
    await WF.goto('/sme-calculator');

    // accept cookies banner
    await WF.closeCookieBanner();

    await expect(page).toHaveURL('sme-calculator');

    // WHEN I TYPE A COMPANY NAME INTO THE SEARCH BAR
    await WF.singleCompanySearch.click({ delay: 500 });
    await WF.singleCompanySearch.fill(REPORT_NAME, { timeout: 5000 });

    // AND I SELECT A COMPANY FROM THE SEARCH RESULTS
    await page.locator(`#result-a-limited-0`).click();

    // WHEN I CLICK THE 'GENERATE REPORT' BUTTON
    await WF.generateReportBtn.click();

    await WF.waitForNavigation();

    // I EXPECT TO BE TAKEN TO THE REPORTS PAGE
    await expect(page.locator(`h1:has-text("${REPORT_NAME}")`)).toBeVisible({
      timeout: 60000
    });

    // AND I CAN EXPORT PDF AND CSV
    const downloadCSVpath = await WF.downloadReport('csv');
    expect(downloadCSVpath).toBeTruthy();
    const downloadPDFpath = await WF.downloadReport('pdf');
    expect(downloadPDFpath).toBeTruthy();
  });
});

test.describe('SME Calculator Advanced and download', async () => {
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, MAKES AN ADVANCED SEARCH WITH A COMPANY ID AND CHANGES CURRENCY
  // FEATURE: USER CREATES A MANUAL REPORT
  test('User can run an MDI report', async ({ browser }) => {
    test.setTimeout(120000);

    const REPORT_ID = '10754754';
    const REPORT_NAME = 'CHOPOVA LOWENA LIMITED';
    const page = await WiserfundingE2E.createPage(browser);
    const WF = new WiserfundingE2E(page);

    // GIVEN I AM ON THE SME CAALCULATOR
    await WF.goto('/sme-calculator');

    // accept cookies banner
    await WF.closeCookieBanner();

    // WHEN I CLICK THE 'ADVANCED SEARCH' BUTTON
    await WF.advancedSearchBtn.click();

    // THEN I CLICK THE COMPANY REGISTRATION NUMBER INPUT
    await WF.companyRegInput.click({ delay: 500 });
    // AND I ENTER A VALID COMPANY REGISTRATION NUMBER
    await WF.companyRegInput.fill(REPORT_ID);

    // THEN I CHANGE THE DEFAULT CURRENCY FROM GBP TO USD
    await WF.currencySelect.click();
    await page.locator('#headlessui-listbox-option-131').click();
    // await page.locator('text=United States - USD ($)').click();

    // WHEN I CLICK THE 'GENERATE REPORT' BUTTON
    await WF.generateReportBtn.click();

    await WF.waitForNavigation(60000);

    await page.waitForSelector(`h1:has-text("${REPORT_NAME}")`, {
      timeout: 40000
    });

    // THEN THE REPORT SHOULD GENERATE AND I SHOULD BE DIRECTED TO THE CORRECT COMPANY REPORT PAGE
    await expect(page.locator(`h1:has-text("${REPORT_NAME}")`)).toBeVisible();

    // AND THE REPORT SHOULD BE GENERATED IN USD
    await expect(page.locator('p:has-text("USD")')).toBeVisible();

    // AND I CAN EXPORT PDF AND CSV
    const downloadCSVpath = await WF.downloadReport('csv');
    expect(downloadCSVpath).toBeTruthy();
    const downloadPDFpath = await WF.downloadReport('pdf');
    expect(downloadPDFpath).toBeTruthy();
  });
});
