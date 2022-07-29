/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';
import { WiserfundingE2E } from '../../playwright-helpers';

test.describe('Batch manual', async () => {
  // SCENARIO: USER NAVIGATES TO THE SINGLE SME-CALC PAGE, INPUTS A COMPANY SEARCH AND GENERATES A REPORT
  // FEATURE: USER GENERATES A SINGLE REPORT
  test('User can view, create and export multiple reports (batch manual)', async ({
    browser
  }) => {
    test.setTimeout(120000);

    const page = await WiserfundingE2E.createPage(browser);
    const WF = new WiserfundingE2E(page);

    // GIVEN I AM ON BATCH-REPORTS
    await WF.goto('/batch-reports');
    // accept cookies banner
    await WF.closeCookieBanner();

    await expect(page).toHaveURL('/batch-reports');
    // await page.waitForNavigation();

    // await expect(WF.batchCreateTitle).toBeVisible();
    await expect(WF.batchInProgressTitle).toBeVisible();
    await expect(WF.batchCompletedTitle).toBeVisible();

    // AND I GO TO CREATE A NEW BATCH REPORT
    await WF.batchCreateBtn.click();

    await WF.waitForNavigation();
    await expect(page).toHaveURL('batch-reports/new');

    await expect(WF.uploadCsvLabel).toBeVisible();
    await expect(WF.batchFilenameInput).toBeVisible();

    // WHEN I FILL THE FORM AND SUBMIT
    await WF.batchFilenameInput.fill(WF.batchAutoName);
    await WF.uploadFile(WF.batchManualFilepath);

    await expect(page.locator(`text=${WF.testCSVFile}`)).toBeVisible();
    await expect(
      page.locator(`text="Is valid batch manual CSV"`)
    ).toBeVisible();

    await WF.runBatchBtn.click();

    // I SHOULD BE TKEN BACK TO THE BATCH REPORTS PAGE
    await WF.waitForNavigation();
    await expect(page).toHaveURL('batch-reports');

    // AND SEE MY REPORT COMPLETED
    await page
      .locator('#completed-batch-reports')
      .locator(`a:has-text("${WF.batchAutoName}")`)
      .waitFor({ timeout: 20000 });

    await expect(
      page
        .locator('#completed-batch-reports')
        .locator(`a:has-text("${WF.batchAutoName}")`)
    ).toBeVisible({ timeout: 20000 });

    // THEN WHEN I CLICK THE REPORT
    await page.locator(`a:has-text("${WF.batchAutoName}")`).click();
    await WF.waitForNavigation();

    await expect(page.locator('text=Multiple Companies')).toBeVisible();
    await expect(
      page.locator(`button:has-text("${WF.batchAutoName}.csv")`)
    ).toBeVisible();

    // I CAN SEE THE SUCCESSFUL REPORTS RAN AS ROWS
    const rows = await page.locator('.active-row').count();
    expect(rows).toBe(3);

    // AND CAN DOWNLOAD THE BATCH REPORT AS A CSV
    const downloadCsv = await WF.downloadBatchReport(`${WF.batchAutoName}.csv`);
    expect(downloadCsv).toBeTruthy();

    // FINALLY I CAN VIEW AN INDIVIDUAL REPORT AND EXPORT TO CSV AND PDF
    await page.locator('.active-row').first().click();

    await WF.waitForNavigation();
    expect(page.url().includes('from=/batch-reports')).toBe(true);

    await expect(page.locator('h1:has-text("company_1")')).toBeVisible({
      timeout: 60000
    });

    // AND I CAN EXPORT PDF AND CSV
    const downloadCSVpath = await WF.downloadReport('csv');
    expect(downloadCSVpath).toBeTruthy();
    const downloadPDFpath = await WF.downloadReport('pdf');
    expect(downloadPDFpath).toBeTruthy();
  });
});
