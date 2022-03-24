/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';
import { login } from '../test-helpers';

login();

const testCSV = 'wiserfunding_required_only_valid_21_reports.csv';

test.describe('Report Upload Tests', async () => {
  // SCENARIO: USER UPLOADS A CSV TO CREATE A BATCH REPORT
  // FEATURE: USER CAN UPLOAD A CSV
  test('User can select CSV', async ({ page }) => {
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
    await fileChooser.setFiles(`./lib/mock-data/csv/${testCSV}`);

    const fileName = page.locator(`text=${testCSV}`);

    // THEN I SHOULD SEE THE FILE HAS BEEN ADDED TO THE UPLOAD LIST
    await expect(fileName).toBeVisible();

    // AND I SHOULD SEE THAT IT HAS BEEN VALIDATED
    await expect(page.locator('text=File is a valid CSV')).toBeVisible();

    // WHEN I CLICK TO REMOVE THE FILE
    await page.locator('text=Remove file').click();

    // THEN THE FILE SHOULD BE REMOVED FROM THE UPLOAD LIST
    await expect(fileName).not.toBeVisible();
  });
});
