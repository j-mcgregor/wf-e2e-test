import { test, expect } from '@playwright/test';
import { login, testCSVFile } from '../../playwright-helpers';

// SCENARIO: USER NAVIGATES TO NEWLY CREATED REPORT, BOOKMARKS IT, NAVIGATES TO 'REPORTS' TO CHECK IT WAS SUCCESSFULLY BOOKMARKED
test('User can upload additional report data by CSV', async ({ page }) => {
  login();
  // GIVEN I AM ON THE HOME PAGE
  await page.goto('/');

  // WHEN I NAVIGATE TO THE MOST RECENT REPORT
  await Promise.all([
    page.waitForNavigation(),
    page.locator('td >> nth=0').click()
  ]);

  // AND I CLICK THE 'UPLOAD MORE DATA' BUTTON
  await Promise.all([
    page.waitForNavigation(),
    page.locator('text=Upload').nth(3).click()
  ]);

  page.waitForTimeout(10000);
  // THEN I SHOULD BE NAVIGATED TO THE UPLOAD DATA PAGE
  await expect(page.url()).toContain('upload-data');

  // WHEN I SELECT A VALID CSV FILE TO UPLOAD
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('label:has-text("Upload your CSV")').click()
  ]);
  await fileChooser.setFiles(`./__mocks__/csv/sme-calculator/${testCSVFile}`);

  const fileName = page.locator(`text=${testCSVFile}`);

  // THEN I SHOULD SEE THE FILE HAS BEEN ADDED TO THE UPLOAD LIST
  await expect(fileName).toBeVisible();

  // AND THERE SHOULD BE NO VALIDATION ERRORS
  await expect(page.locator('#validation-cross')).not.toBeVisible(); // added id to the validation error crosses for easier location

  // WHEN I CLICK GENERATE REPORT I SHOULD BE NAVIGATED TO NEW REPORT PAGE
  await page.locator('text=Generate new report').click();

  // AND 'REPORT' SHOULD BE IN THE URL
  // (not sure how else to test this... possibly too vague?)
  await expect(page.url()).toContain('report');
});
