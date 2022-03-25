/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';
import { login } from '../test-helpers';

login();

const testCSVFile = 'wiserfunding_required_only_valid_21_reports.csv';

test.describe('Report Upload Tests', async () => {
  // SCENARIO: USER UPLOADS A CSV TO CREATE A BATCH REPORT
  // FEATURE: USER CAN CREATE A REPORT FROM A CSV
  test('User can add single CSV', async ({ page }) => {
    // GIVEN I CLICK THE SINGLE COMPANY NAV BUTTON
    await page.locator('text=Single Company').first().click();

    // THEN I SHOULD BE DIRECTED TO THE SME-CALC PAGE
    await expect(page).toHaveURL('sme-calculator');

    // WHEN I CLICK PROVIDE OWN DATA BUTTON
    await page.locator('text=Provide own data').click();

    // AND I CLICK THE UPLOAD CSV SELECT
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('text=Upload your CSV').click()
    ]);

    // AND I SELECT A CSV FILE TO UPLOAD
    await fileChooser.setFiles(`./lib/mock-data/csv/${testCSVFile}`);

    const fileName = page.locator(`text=${testCSVFile}`);

    // THEN I SHOULD SEE THE FILE HAS BEEN ADDED TO THE UPLOAD LIST
    await expect(fileName).toBeVisible();

    // AND I SHOULD SEE THAT IT HAS BEEN VALIDATED
    await expect(page.locator('text=File is a valid CSV')).toBeVisible();

    // WHEN I CLICK TO REMOVE THE FILE
    await page.locator('text=Remove file').click();

    // THEN THE FILE SHOULD BE REMOVED FROM THE UPLOAD LIST
    await expect(fileName).not.toBeVisible();
  });

  // --------------------------------------------------

  // SCENARIO: USER CAN UPLOAD A CSV TO CREATE A BATCH REPORT
  // FEATURE: USER CAN CREATE A BATCH REPORT FROM A CSV
  test(`User can add batch of CSV's`, async ({ page }) => {
    // GIVEN I CLICK THE MULTIPLE COMPANIES NAV BUTTON
    await page.locator('text=Multiple Companies').first().click();

    // THEN I SHOULD BE DIRECTED TO THE BATCH REPORTS PAGE
    await expect(page).toHaveURL('batch-reports');

    // AND I SHOULD SEE A CREATE BATCH REPORT LINK
    const createBatchReportLink = page.locator('text=Create a Batch Report');
    await expect(createBatchReportLink).toBeVisible();

    // WHEN I CLICK THE CREATE BATCH REPORT LINK
    await createBatchReportLink.click();

    // THEN I SHOULD BE TAKEN TO THE BATCH REPORTS/NEW PAGE
    await expect(page).toHaveURL('batch-reports/new');

    // WHEN I CLICK THE NAME REPORT INPUT FIELD
    const nameReportInput = page.locator(
      '[placeholder="Name your batched report"]'
    );

    await nameReportInput.click();

    // AND I TYPE A NAME FOR THE REPORT
    await nameReportInput.fill('example report');

    // WHEN I SELECT A VALID CSV FILE TO UPLOAD
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('label:has-text("Upload your CSV")').click()
    ]);

    await fileChooser.setFiles(`./lib/mock-data/csv/${testCSVFile}`);

    // THEN I SHOULD SEE THE FILE HAS BEEN ADDED TO THE UPLOAD LIST
    const fileName = page.locator(`text=${testCSVFile}`);
    await expect(fileName).toBeVisible();

    // AND I SHOULD SEE THAT IT HAS BEEN VALIDATED
    await expect(page.locator('text=File is a valid CSV')).toBeVisible();

    // WHEN I CLICK TO REMOVE THE FILE
    await page.locator('text=Remove file').click();

    // THEN THE FILE SHOULD BE REMOVED FROM THE UPLOAD LIST
    await expect(fileName).not.toBeVisible();
  });
});
